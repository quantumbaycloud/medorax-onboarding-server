from datetime import date, time
from decimal import Decimal
from uuid import UUID
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator
import re

PASSWORD_RE = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,128}$')
PHONE_RE = re.compile(r'^\+[1-9]\d{7,14}$')
IFSC_RE = re.compile(r'^[A-Z]{4}0[A-Z0-9]{6}$')
PAN_RE = re.compile(r'^[A-Z]{5}\d{4}[A-Z]$')
GST_RE = re.compile(r'^[0-9A-Z]{15}$')

class ErrorResponse(BaseModel):
    message: str
    errors: list[dict] = []

class RegisterRequest(BaseModel):
    fullName: str = Field(min_length=2, max_length=120)
    email: EmailStr
    mobileNumber: str = Field(min_length=8, max_length=30)
    password: str = Field(min_length=10, max_length=128)
    confirmPassword: str = Field(min_length=10, max_length=128)
    @field_validator('fullName')
    @classmethod
    def name(cls,v):
        if not re.fullmatch(r"[A-Za-zÀ-ÖØ-öø-ÿ .'-]{2,120}", v.strip()): raise ValueError('Invalid full name')
        return v.strip()
    @field_validator('mobileNumber')
    @classmethod
    def phone(cls,v):
        if not PHONE_RE.fullmatch(v.strip()): raise ValueError('Mobile number must use international format, e.g. +919876543210')
        return v.strip()
    @field_validator('password')
    @classmethod
    def pwd(cls,v):
        if not PASSWORD_RE.fullmatch(v): raise ValueError('Password must be 10-128 characters and include upper, lower, number and special character')
        return v
    @model_validator(mode='after')
    def match(self):
        if self.password != self.confirmPassword: raise ValueError('Passwords do not match')
        return self

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class RefreshRequest(BaseModel): refreshToken: str = Field(min_length=20, max_length=1000)
class LogoutRequest(BaseModel): refreshToken: str = Field(min_length=20, max_length=1000)
class VerifyEmailRequest(BaseModel): token: str = Field(min_length=20, max_length=1000)
class EmailRequest(BaseModel): email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=20, max_length=1000)
    newPassword: str = Field(min_length=10, max_length=128)
    confirmPassword: str = Field(min_length=10, max_length=128)
    @field_validator('newPassword')
    @classmethod
    def pwd(cls,v):
        if not PASSWORD_RE.fullmatch(v): raise ValueError('Password must be 10-128 characters and include upper, lower, number and special character')
        return v
    @model_validator(mode='after')
    def match(self):
        if self.newPassword != self.confirmPassword: raise ValueError('Passwords do not match')
        return self

class SendOtpRequest(BaseModel):
    mobileNumber: str = Field(min_length=8, max_length=30)
    @field_validator('mobileNumber')
    @classmethod
    def phone(cls,v):
        if not PHONE_RE.fullmatch(v.strip()): raise ValueError('Invalid mobile number')
        return v.strip()
class VerifyOtpRequest(BaseModel):
    mobileNumber: str
    otp: str = Field(pattern=r"^\d{6}$")

class BusinessTypeRequest(BaseModel): businessType: int = Field(ge=0, le=1)

class PharmacyRequest(BaseModel):
    pharmacyName: str = Field(min_length=2,max_length=200)
    contactPerson: str | None = Field(default=None,max_length=120)
    contactNumber: str | None = Field(default=None,max_length=30)
    email: EmailStr | None = None
    gstNumber: str | None = Field(default=None,max_length=30)
    panNumber: str | None = Field(default=None,max_length=20)
    drugLicenseNumber: str | None = Field(default=None,max_length=80)
    drugLicenseExpiryDate: date | None = None
    pharmacyRegistrationNumber: str | None = Field(default=None,max_length=80)
    storeOpenTime: time | None = None
    storeCloseTime: time | None = None
    is24x7: bool = False
    emergencyContactNumber: str | None = Field(default=None,max_length=30)
    formattedAddress: str | None = Field(default=None,max_length=1000)
    latitude: float | None = Field(default=None,ge=-90,le=90)
    longitude: float | None = Field(default=None,ge=-180,le=180)
    @field_validator('gstNumber')
    @classmethod
    def gst(cls,v): return v.strip().upper() if v else v
    @field_validator('panNumber')
    @classmethod
    def pan(cls,v):
        v=v.strip().upper() if v else v
        if v and not PAN_RE.fullmatch(v): raise ValueError('Invalid PAN')
        return v

class DistributorRequest(BaseModel):
    companyName: str = Field(min_length=2,max_length=200)
    contactPerson: str | None = Field(default=None,max_length=120)
    contactNumber: str | None = Field(default=None,max_length=30)
    email: EmailStr | None = None
    gstNumber: str | None = Field(default=None,max_length=30)
    drugLicenseNumber: str | None = Field(default=None,max_length=80)
    drugLicenseExpiryDate: date | None = None
    panNumber: str | None = Field(default=None,max_length=20)
    distributorRegistrationNumber: str | None = Field(default=None,max_length=80)
    serviceCities: list[str] = Field(default_factory=list,max_length=100)
    minimumOrderValue: Decimal | None = Field(default=None,ge=0,max_digits=14,decimal_places=2)
    isCreditAvailable: bool = False
    creditDays: int | None = Field(default=None,ge=0,le=3650)
    maximumCreditLimit: Decimal | None = Field(default=None,ge=0,max_digits=14,decimal_places=2)
    hasOwnDelivery: bool = False
    deliveryVehicleTypes: list[str] = Field(default_factory=list,max_length=20)
    warehouseOpenTime: time | None = None
    warehouseCloseTime: time | None = None
    is24x7: bool = False
    emergencyContactNumber: str | None = Field(default=None,max_length=30)
    formattedAddress: str | None = Field(default=None,max_length=1000)
    latitude: float | None = Field(default=None,ge=-90,le=90)
    longitude: float | None = Field(default=None,ge=-180,le=180)
    @model_validator(mode='after')
    def dependent(self):
        if not self.isCreditAvailable and (self.creditDays is not None or self.maximumCreditLimit is not None): self.creditDays=None; self.maximumCreditLimit=None
        if not self.hasOwnDelivery: self.deliveryVehicleTypes=[]
        return self

class BankRequest(BaseModel):
    accountHolderName: str = Field(min_length=2,max_length=120)
    bankName: str = Field(min_length=2,max_length=150)
    accountNumber: str = Field(min_length=6,max_length=34)
    confirmAccountNumber: str = Field(min_length=6,max_length=34)
    ifscCode: str = Field(min_length=11,max_length=11)
    branchName: str | None = Field(default=None,max_length=150)
    upiId: str | None = Field(default=None,max_length=255)
    @field_validator('ifscCode')
    @classmethod
    def ifsc(cls,v):
        v=v.strip().upper()
        if not IFSC_RE.fullmatch(v): raise ValueError('Invalid IFSC code')
        return v
    @model_validator(mode='after')
    def account_match(self):
        if self.accountNumber != self.confirmAccountNumber: raise ValueError('Account numbers do not match')
        return self

class LocationRequest(BaseModel):
    locationType: int = Field(ge=0,le=20)
    warehouseName: str | None = Field(default=None,max_length=200)
    contactPerson: str | None = Field(default=None,max_length=120)
    contactNumber: str | None = Field(default=None,max_length=30)
    latitude: float | None = Field(default=None,ge=-90,le=90)
    longitude: float | None = Field(default=None,ge=-180,le=180)
    accuracy: float | None = Field(default=None,ge=0,le=100000)
    formattedAddress: str | None = Field(default=None,max_length=1000)
    addressLine1: str | None = Field(default=None,max_length=250)
    addressLine2: str | None = Field(default=None,max_length=250)
    city: str | None = Field(default=None,max_length=100)
    state: str | None = Field(default=None,max_length=100)
    country: str | None = Field(default=None,max_length=100)
    pincode: str | None = Field(default=None,max_length=20)
    isPrimary: bool = False

class AdminUserUpdate(BaseModel):
    isActive: bool | None = None
    role: str | None = Field(default=None,pattern=r'^(Owner|Admin|Staff)$')

class TokenResponse(BaseModel):
    userId: UUID
    fullName: str
    email: EmailStr
    role: str
    accessToken: str
    refreshToken: str
    expiresIn: int
