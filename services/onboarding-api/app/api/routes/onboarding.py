from datetime import datetime, timezone
from pathlib import Path
import hashlib, secrets, os, stat, json, urllib.request, urllib.error
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models import User, Pharmacy, Distributor, BankDetails, BusinessLocation, Document
from app.schemas import *
from app.core.deps import current_user
from app.core.config import settings
from app.core.security import encrypt, decrypt, encrypt_bytes, decrypt_bytes
from app.core.rate_limit import guard
from app.services.audit import audit

router = APIRouter(prefix='/onboarding', tags=['Onboarding'])
STORAGE = Path('/app/storage/documents')
STORAGE.mkdir(parents=True, exist_ok=True)
try:
    os.chmod(STORAGE, 0o700)
except OSError:
    pass
ALLOWED = {
    'application/pdf': {b'%PDF'},
    'image/jpeg': {b'\xff\xd8\xff'},
    'image/png': {b'\x89PNG\r\n\x1a\n'},
}

def public_user(u):
    return {'userId': str(u.id), 'fullName': u.full_name, 'email': u.email, 'role': u.role, 'businessType': u.business_type, 'emailVerified': u.email_verified, 'mobileVerified': u.mobile_verified}

def pharmacy_out(x):
    d = {k: getattr(x, k) for k in ['id','pharmacy_name','contact_person','contact_number','email','gst_number','pan_number','drug_license_number','drug_license_expiry_date','pharmacy_registration_number','store_open_time','store_close_time','is_24x7','emergency_contact_number','formatted_address','latitude','longitude']}
    return {'id':str(d.pop('id')),'pharmacyName':d.pop('pharmacy_name'),'contactPerson':d.pop('contact_person'),'contactNumber':d.pop('contact_number'),'email':d.pop('email'),'gstNumber':d.pop('gst_number'),'panNumber':d.pop('pan_number'),'drugLicenseNumber':d.pop('drug_license_number'),'drugLicenseExpiryDate':d.pop('drug_license_expiry_date'),'pharmacyRegistrationNumber':d.pop('pharmacy_registration_number'),'storeOpenTime':d.pop('store_open_time'),'storeCloseTime':d.pop('store_close_time'),'is24x7':d.pop('is_24x7'),'emergencyContactNumber':d.pop('emergency_contact_number'),'formattedAddress':d.pop('formatted_address'),'latitude':d.pop('latitude'),'longitude':d.pop('longitude')}

def distributor_out(x):
    return {'id':str(x.id),'companyName':x.company_name,'contactPerson':x.contact_person,'contactNumber':x.contact_number,'email':x.email,'gstNumber':x.gst_number,'drugLicenseNumber':x.drug_license_number,'drugLicenseExpiryDate':x.drug_license_expiry_date,'panNumber':x.pan_number,'distributorRegistrationNumber':x.distributor_registration_number,'serviceCities':x.service_cities or [],'minimumOrderValue':x.minimum_order_value,'isCreditAvailable':x.is_credit_available,'creditDays':x.credit_days,'maximumCreditLimit':x.maximum_credit_limit,'hasOwnDelivery':x.has_own_delivery,'deliveryVehicleTypes':x.delivery_vehicle_types or [],'warehouseOpenTime':x.warehouse_open_time,'warehouseCloseTime':x.warehouse_close_time,'is24x7':x.is_24x7,'emergencyContactNumber':x.emergency_contact_number,'formattedAddress':x.formatted_address,'latitude':x.latitude,'longitude':x.longitude}

def location_out(x):
    return {'id':str(x.id),'locationType':x.location_type,'warehouseName':x.warehouse_name,'contactPerson':x.contact_person,'contactNumber':x.contact_number,'latitude':x.latitude,'longitude':x.longitude,'accuracy':x.accuracy,'formattedAddress':x.formatted_address,'addressLine1':x.address_line1,'addressLine2':x.address_line2,'city':x.city,'state':x.state,'country':x.country,'pincode':x.pincode,'isPrimary':x.is_primary}

def doc_out(x):
    return {'id':str(x.id),'documentType':x.document_type,'fileName':x.file_name,'fileSize':x.file_size,'uploadedAt':x.created_at,'status':x.status}

def _safe_filename(name: str) -> str:
    base = Path(name or 'document').name.replace('\x00', '')
    return base[:255] or 'document'

def _secure_file(path: Path):
    try: os.chmod(path, 0o600)
    except OSError: pass

async def inspect_upload(file: UploadFile):
    filename = _safe_filename(file.filename or '')
    ext = Path(filename).suffix.lower()
    if ext not in {'.pdf','.jpg','.jpeg','.png'}: raise HTTPException(400,'Only PDF, JPG and PNG files are allowed')
    if file.content_type not in ALLOWED: raise HTTPException(400,'Unsupported file type')
    content = await file.read(settings.max_upload_bytes + 1)
    if len(content) > settings.max_upload_bytes: raise HTTPException(413,'File too large')
    signatures = ALLOWED[file.content_type]
    if not any(content.startswith(sig) for sig in signatures): raise HTTPException(400,'File content does not match its declared type')
    if file.content_type == 'application/pdf' and b'%%EOF' not in content[-4096:]: raise HTTPException(400,'Invalid PDF file')
    return filename, content, hashlib.sha256(content).hexdigest()

@router.post('/select-business')
async def select_business(body:BusinessTypeRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    user.business_type='Pharmacy' if body.businessType==0 else 'Distributor'
    await audit(db,'BUSINESS_TYPE_SELECTED',user.id)
    await db.commit()
    return {'message':'Business type selected','businessType':user.business_type}

@router.post('/pharmacy/details')
async def pharmacy(body:PharmacyRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    if user.business_type not in (None,'Pharmacy'): raise HTTPException(409,'Distributor account cannot submit pharmacy details')
    user.business_type='Pharmacy'; row=(await db.execute(select(Pharmacy).where(Pharmacy.user_id==user.id))).scalar_one_or_none()
    if not row: row=Pharmacy(user_id=user.id); db.add(row)
    for src,dst in {'pharmacyName':'pharmacy_name','contactPerson':'contact_person','contactNumber':'contact_number','email':'email','gstNumber':'gst_number','panNumber':'pan_number','drugLicenseNumber':'drug_license_number','drugLicenseExpiryDate':'drug_license_expiry_date','pharmacyRegistrationNumber':'pharmacy_registration_number','storeOpenTime':'store_open_time','storeCloseTime':'store_close_time','is24x7':'is_24x7','emergencyContactNumber':'emergency_contact_number','formattedAddress':'formatted_address','latitude':'latitude','longitude':'longitude'}.items(): setattr(row,dst,getattr(body,src))
    await audit(db,'PHARMACY_DETAILS_SAVED',user.id); await db.commit(); return pharmacy_out(row)

@router.get('/pharmacy/details')
async def get_my_pharmacy(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=(await db.execute(select(Pharmacy).where(Pharmacy.user_id==user.id))).scalar_one_or_none()
    return pharmacy_out(row) if row else {}

@router.get('/pharmacy/details/{id}')
async def get_pharmacy(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Pharmacy,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Pharmacy details not found')
    return pharmacy_out(row)

@router.put('/pharmacy/details/{id}')
async def update_pharmacy(id:UUID,body:PharmacyRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Pharmacy,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Pharmacy details not found')
    for src,dst in {'pharmacyName':'pharmacy_name','contactPerson':'contact_person','contactNumber':'contact_number','email':'email','gstNumber':'gst_number','panNumber':'pan_number','drugLicenseNumber':'drug_license_number','drugLicenseExpiryDate':'drug_license_expiry_date','pharmacyRegistrationNumber':'pharmacy_registration_number','storeOpenTime':'store_open_time','storeCloseTime':'store_close_time','is24x7':'is_24x7','emergencyContactNumber':'emergency_contact_number','formattedAddress':'formatted_address','latitude':'latitude','longitude':'longitude'}.items(): setattr(row,dst,getattr(body,src))
    await db.commit(); return pharmacy_out(row)

@router.post('/distributor/details')
async def distributor(body:DistributorRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    if user.business_type not in (None,'Distributor'): raise HTTPException(409,'Pharmacy account cannot submit distributor details')
    user.business_type='Distributor'; row=(await db.execute(select(Distributor).where(Distributor.user_id==user.id))).scalar_one_or_none()
    if not row: row=Distributor(user_id=user.id); db.add(row)
    for src,dst in {'companyName':'company_name','contactPerson':'contact_person','contactNumber':'contact_number','email':'email','gstNumber':'gst_number','drugLicenseNumber':'drug_license_number','drugLicenseExpiryDate':'drug_license_expiry_date','panNumber':'pan_number','distributorRegistrationNumber':'distributor_registration_number','serviceCities':'service_cities','minimumOrderValue':'minimum_order_value','isCreditAvailable':'is_credit_available','creditDays':'credit_days','maximumCreditLimit':'maximum_credit_limit','hasOwnDelivery':'has_own_delivery','deliveryVehicleTypes':'delivery_vehicle_types','warehouseOpenTime':'warehouse_open_time','warehouseCloseTime':'warehouse_close_time','is24x7':'is_24x7','emergencyContactNumber':'emergency_contact_number','formattedAddress':'formatted_address','latitude':'latitude','longitude':'longitude'}.items(): setattr(row,dst,getattr(body,src))
    await audit(db,'DISTRIBUTOR_DETAILS_SAVED',user.id); await db.commit(); return distributor_out(row)

@router.get('/distributor/details')
async def get_my_distributor(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=(await db.execute(select(Distributor).where(Distributor.user_id==user.id))).scalar_one_or_none()
    return distributor_out(row) if row else {}

@router.get('/distributor/details/{id}')
async def get_distributor(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Distributor,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Distributor details not found')
    return distributor_out(row)

@router.put('/distributor/details/{id}')
async def update_distributor(id:UUID,body:DistributorRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Distributor,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Distributor details not found')
    mapping={'companyName':'company_name','contactPerson':'contact_person','contactNumber':'contact_number','email':'email','gstNumber':'gst_number','drugLicenseNumber':'drug_license_number','drugLicenseExpiryDate':'drug_license_expiry_date','panNumber':'pan_number','distributorRegistrationNumber':'distributor_registration_number','serviceCities':'service_cities','minimumOrderValue':'minimum_order_value','isCreditAvailable':'is_credit_available','creditDays':'credit_days','maximumCreditLimit':'maximum_credit_limit','hasOwnDelivery':'has_own_delivery','deliveryVehicleTypes':'delivery_vehicle_types','warehouseOpenTime':'warehouse_open_time','warehouseCloseTime':'warehouse_close_time','is24x7':'is_24x7','emergencyContactNumber':'emergency_contact_number','formattedAddress':'formatted_address','latitude':'latitude','longitude':'longitude'}
    for k,v in body.model_dump().items(): setattr(row,mapping[k],v)
    await db.commit(); return distributor_out(row)

@router.get('/ifsc/{ifsc}')
async def verify_ifsc(ifsc: str):
    """Verify an IFSC against Razorpay's public IFSC directory and return bank/branch metadata."""
    code = ifsc.strip().upper()
    import re
    if not re.fullmatch(r'[A-Z]{4}0[A-Z0-9]{6}', code):
        raise HTTPException(422, 'Invalid IFSC code format')
    url = f'https://ifsc.razorpay.com/{code}'
    try:
        req = urllib.request.Request(url, headers={'Accept': 'application/json', 'User-Agent': 'Medorax-Onboarding/1.0'})
        with urllib.request.urlopen(req, timeout=6) as response:
            payload = json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as exc:
        if exc.code == 404: raise HTTPException(404, 'IFSC code not found. Please check the code.')
        raise HTTPException(502, 'IFSC verification service is temporarily unavailable')
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
        raise HTTPException(502, 'IFSC verification service is temporarily unavailable')
    bank_name = payload.get('BANK') or payload.get('bank')
    branch = payload.get('BRANCH') or payload.get('branch')
    city = payload.get('CITY') or payload.get('city')
    state = payload.get('STATE') or payload.get('state')
    if not bank_name or not branch:
        raise HTTPException(404, 'Bank details could not be verified for this IFSC code')
    return {'valid': True, 'success': True, 'ifscCode': code, 'bankName': bank_name, 'branch': branch, 'branchName': branch, 'city': city or '', 'state': state or ''}

@router.post('/bank-details')
async def bank(body:BankRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=(await db.execute(select(BankDetails).where(BankDetails.user_id==user.id))).scalar_one_or_none()
    vals={'account_holder_name_enc':encrypt(body.accountHolderName),'bank_name_enc':encrypt(body.bankName),'account_number_enc':encrypt(body.accountNumber),'ifsc_code':body.ifscCode,'branch_name_enc':encrypt(body.branchName),'upi_id_enc':encrypt(body.upiId)}
    if not row: row=BankDetails(user_id=user.id,**vals); db.add(row)
    else:
        for k,v in vals.items(): setattr(row,k,v)
    await audit(db,'BANK_DETAILS_SAVED',user.id); await db.commit(); return {'message':'Bank details saved securely'}

@router.get('/bank-details')
async def get_bank(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=(await db.execute(select(BankDetails).where(BankDetails.user_id==user.id))).scalar_one_or_none()
    if not row: return None
    try:
        account=decrypt(row.account_number_enc) or ''
        holder=decrypt(row.account_holder_name_enc) or ''
        bank_name=decrypt(row.bank_name_enc) or ''
        branch=decrypt(row.branch_name_enc) if row.branch_name_enc else ''
        upi=decrypt(row.upi_id_enc) if row.upi_id_enc else ''
    except Exception:
        raise HTTPException(500,'Stored bank details could not be decrypted')
    return {'accountHolderName':holder,'bankName':bank_name,'accountNumberMasked':('*' * max(0,len(account)-4) + account[-4:]) if account else '','ifscCode':row.ifsc_code,'branchName':branch,'upiId':upi}

@router.post('/location')
async def save_location(body:LocationRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    if body.isPrimary: await db.execute(update(BusinessLocation).where(BusinessLocation.user_id==user.id).values(is_primary=False))
    row=BusinessLocation(user_id=user.id,**{k.replace('locationType','location_type').replace('warehouseName','warehouse_name').replace('contactPerson','contact_person').replace('contactNumber','contact_number').replace('formattedAddress','formatted_address').replace('addressLine1','address_line1').replace('addressLine2','address_line2').replace('isPrimary','is_primary').replace('pincode','pincode').replace('latitude','latitude').replace('longitude','longitude').replace('accuracy','accuracy').replace('city','city').replace('state','state').replace('country','country'):v for k,v in body.model_dump().items()})
    db.add(row); await audit(db,'LOCATION_CREATED',user.id); await db.commit(); await db.refresh(row); return location_out(row)

@router.get('/location')
async def locations(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    rows=(await db.execute(select(BusinessLocation).where(BusinessLocation.user_id==user.id).order_by(BusinessLocation.created_at))).scalars().all(); return [location_out(x) for x in rows]

@router.get('/location/{id}')
async def location(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(BusinessLocation,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Location not found')
    return location_out(row)

@router.put('/location/{id}')
async def update_location(id:UUID,body:LocationRequest,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(BusinessLocation,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Location not found')
    if body.isPrimary: await db.execute(update(BusinessLocation).where(BusinessLocation.user_id==user.id).values(is_primary=False))
    mapping={'locationType':'location_type','warehouseName':'warehouse_name','contactPerson':'contact_person','contactNumber':'contact_number','latitude':'latitude','longitude':'longitude','accuracy':'accuracy','formattedAddress':'formatted_address','addressLine1':'address_line1','addressLine2':'address_line2','city':'city','state':'state','country':'country','pincode':'pincode','isPrimary':'is_primary'}
    for k,v in body.model_dump().items(): setattr(row,mapping[k],v)
    await db.commit(); return location_out(row)

@router.delete('/location/{id}')
async def delete_location(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(BusinessLocation,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Location not found')
    await db.delete(row); await db.commit(); return {'message':'Location deleted successfully'}

@router.post('/documents/upload')
async def upload_document(request:Request,documentType:int=Form(...),file:UploadFile=File(...),user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    await guard(request,'document-upload',10,60)
    if not 1<=documentType<=10: raise HTTPException(400,'Invalid document type')
    filename,plain,sha=await inspect_upload(file)
    stored_name=secrets.token_hex(32)+'.medx'
    path=STORAGE/stored_name
    encrypted=encrypt_bytes(plain)
    try:
        path.write_bytes(encrypted); _secure_file(path)
        row=Document(user_id=user.id,document_type=documentType,file_name=filename,stored_name=stored_name,mime_type=file.content_type or 'application/octet-stream',file_size=len(plain),sha256=sha,status='uploaded')
        db.add(row); await audit(db,'DOCUMENT_UPLOADED',user.id,request,{'documentType':documentType,'sha256':sha}); await db.commit(); await db.refresh(row)
        return doc_out(row)
    except Exception:
        path.unlink(missing_ok=True)
        await db.rollback()
        raise

@router.get('/documents')
async def documents(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    rows=(await db.execute(select(Document).where(Document.user_id==user.id).order_by(Document.created_at.desc()))).scalars().all(); return [doc_out(x) for x in rows]

@router.get('/documents/{id}')
async def document(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Document,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Document not found')
    return doc_out(row)

@router.put('/documents/{id}')
async def update_document(request:Request,id:UUID,documentType:int=Form(...),file:UploadFile=File(...),user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    await guard(request,'document-update',10,60)
    row=await db.get(Document,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Document not found')
    filename,plain,sha=await inspect_upload(file)
    new_name=secrets.token_hex(32)+'.medx'; new_path=STORAGE/new_name; old_path=STORAGE/row.stored_name
    try:
        new_path.write_bytes(encrypt_bytes(plain)); _secure_file(new_path)
        row.document_type=documentType; row.file_name=filename; row.stored_name=new_name; row.mime_type=file.content_type or 'application/octet-stream'; row.file_size=len(plain); row.sha256=sha; row.status='uploaded'
        await audit(db,'DOCUMENT_REPLACED',user.id,request); await db.commit()
        old_path.unlink(missing_ok=True)
        return doc_out(row)
    except Exception:
        new_path.unlink(missing_ok=True); await db.rollback(); raise

@router.post('/documents/{id}/reupload')
async def reupload(id:UUID,request:Request,file:UploadFile=File(...),user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    await guard(request,'document-reupload',10,60)
    row=await db.get(Document,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Document not found')
    filename,plain,sha=await inspect_upload(file)
    new_name=secrets.token_hex(32)+'.medx'; new_path=STORAGE/new_name; old_path=STORAGE/row.stored_name
    try:
        new_path.write_bytes(encrypt_bytes(plain)); _secure_file(new_path)
        row.file_name=filename; row.stored_name=new_name; row.mime_type=file.content_type or 'application/octet-stream'; row.file_size=len(plain); row.sha256=sha; row.status='uploaded'
        await audit(db,'DOCUMENT_REUPLOADED',user.id,request); await db.commit(); old_path.unlink(missing_ok=True); return doc_out(row)
    except Exception:
        new_path.unlink(missing_ok=True); await db.rollback(); raise

@router.delete('/documents/{id}')
async def delete_document(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Document,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Document not found')
    path=STORAGE/row.stored_name; await db.delete(row); await db.commit(); path.unlink(missing_ok=True); return {'message':'Document deleted successfully'}

@router.get('/documents/{id}/download')
async def download(id:UUID,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    row=await db.get(Document,id)
    if not row or row.user_id!=user.id: raise HTTPException(404,'Document not found')
    path=STORAGE/row.stored_name
    if not path.exists(): raise HTTPException(404,'Document file not found')
    try: encrypted=path.read_bytes(); plain=decrypt_bytes(encrypted)
    except Exception: raise HTTPException(500,'Document storage is corrupted or uses an unsupported legacy format; please re-upload it')
    if hashlib.sha256(plain).hexdigest()!=row.sha256: raise HTTPException(500,'Document integrity check failed')
    headers={'Content-Disposition': f'attachment; filename="{_safe_filename(row.file_name)}"','X-Content-Type-Options':'nosniff','Cache-Control':'private, no-store'}
    return StreamingResponse(iter([plain]),media_type=row.mime_type,headers=headers)

@router.get('/status')
async def status(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    p=(await db.execute(select(Pharmacy).where(Pharmacy.user_id==user.id))).scalar_one_or_none(); d=(await db.execute(select(Distributor).where(Distributor.user_id==user.id))).scalar_one_or_none(); docs=(await db.execute(select(Document).where(Document.user_id==user.id))).scalars().all(); loc=(await db.execute(select(BusinessLocation).where(BusinessLocation.user_id==user.id))).scalars().all(); return {'user':public_user(user),'businessType':user.business_type,'pharmacy':pharmacy_out(p) if p else None,'distributor':distributor_out(d) if d else None,'documents':[doc_out(x) for x in docs],'locations':[location_out(x) for x in loc]}

@router.post('/verify')
async def verify_business(user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    return {'message':'Business verification submitted','status':'pending'}
