import React from 'react';
import {
  CheckCircle,
  BadgeCheck,
  Shield,
  Eye,
  Ban,
  UserCheck
} from 'lucide-react';
import { drawerData } from '../../pages/supplierVerification/data';

const VerificationDrawer = () => {
  return (
    <div className="xl:col-span-4 flex flex-col gap-4">
      <div className="bg-[#ffffff] rounded-xl shadow-md overflow-hidden flex flex-col">

        {/* Header */}
        <div className="p-6 bg-[#f1f3ff] flex flex-col gap-1 relative">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#9cf6bc] text-[#00522f] text-[12px] font-semibold leading-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]"></span>
              KYC Verification Active
            </span>

            <span className="text-[11px] font-medium text-[#424751] leading-4">
              App ID: {drawerData.id}
            </span>
          </div>

          <div className="mt-1">
            <h2 className="text-[20px] font-bold text-[#171c24] leading-7">
              {drawerData.name}
            </h2>

            <p className="text-[13px] text-[#424751] leading-5">
              Category: {drawerData.category}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-2 pt-2 border-t border-[#c3c6d2]/30 text-[12px] font-medium text-[#424751] leading-4">
            <span className="flex items-center gap-1">
              <BadgeCheck size={16} className="text-[#006d40]" />
              GSTIN Active
            </span>

            <span className="flex items-center gap-1">
              <Shield size={16} className="text-[#006d40]" />
              CIBIL 790
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-280px)]">

          {/* Statutory & Tax Compliance */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
              Statutory & Tax Compliance
            </span>

            <div className="bg-[#f1f3ff] rounded-lg p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#424751] leading-5">
                  GSTIN Status
                </span>

                <span className="text-[14px] font-semibold text-[#171c24] tracking-mono leading-5">
                  {drawerData.gstin}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#424751] leading-5">
                  Drug License Reg
                </span>

                <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#006d40] leading-5">
                  <CheckCircle size={16} />
                  {drawerData.drugLicense}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#424751] leading-5">
                  Validity Window
                </span>

                <span className="text-[14px] text-[#171c24] leading-5">
                  {drawerData.validity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#424751] leading-5">
                  Registered Pharmacist
                </span>

                <span className="text-[14px] text-[#171c24] leading-5">
                  {drawerData.pharmacist}
                </span>
              </div>
            </div>
          </div>

          {/* Credit Request & Risk Appetite */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
              Credit Request & Risk Appetite
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#f1f3ff] rounded-lg p-4 flex flex-col">
                <span className="text-[11px] text-[#424751] leading-4">
                  Credit Limit Req.
                </span>

                <span className="text-[18px] font-bold text-[#235eac] mt-1 leading-7">
                  {drawerData.creditLimit}
                </span>

                <span className="text-[11px] text-[#424751] leading-4">
                  Rec. Max: {drawerData.recommendedMax}
                </span>
              </div>

              <div className="bg-[#f1f3ff] rounded-lg p-4 flex flex-col">
                <span className="text-[11px] text-[#424751] leading-4">
                  Repayment Window
                </span>

                <span className="text-[18px] font-bold text-[#171c24] mt-1 leading-7">
                  {drawerData.creditTerms}
                </span>

                <span className="text-[11px] text-[#006d40] leading-4">
                  Standard Tier-2 Term
                </span>
              </div>
            </div>
          </div>

          {/* Submitted KYC Proofs */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
                Submitted KYC Proofs (2)
              </span>

              <span className="text-[12px] font-medium text-[#235eac] hover:underline cursor-pointer leading-4">
                Download All ZIP
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {drawerData.documents.map((doc, index) => {
                const DocIcon = doc.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-[#f1f3ff] hover:bg-[#e5e8f4] rounded-lg transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 rounded bg-[#d6e3ff] flex items-center justify-center text-[#001b3e] shrink-0">
                        <DocIcon size={20} />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-semibold text-[#171c24] truncate group-hover:text-[#235eac] leading-5">
                          {doc.name}
                        </span>

                        <span className="text-[11px] text-[#424751] leading-4">
                          {doc.type} • {doc.size} • {doc.badge}
                        </span>
                      </div>
                    </div>

                    <button
                      className="p-1 text-[#737782] hover:text-[#235eac]"
                      title="Preview Document"
                      type="button"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Document Inspection Preview */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
              Document Inspection Preview
            </span>

            <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#e5e8f4] flex flex-col justify-end p-2">
              <img
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBscjpZHQUo4Oznc8QiqrNUFtKjNiuSwVYwKQihWRi8XvH7rRMoF2giEfCQGx0TcJBqkUC-k-DHzDoPxR9FbunnBAMYPXZH1H1fn6Ny4vKj2agec2arG5AMTYRnuAGJ-3x_tXk_55QU-x0E1lWcv3xt7F3-0V7hUTB7mmxMRR7VuYm4wNWgGxnIrK_NxqwKjMU_V8vBgtOfzEiU-nmKtn2qRGUaVbJmm97y88SjtPL0bufxm1MuxzImhQ"
                alt="Document preview"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2c303a]/80 via-[#2c303a]/20 to-transparent"></div>

              <div className="relative z-10 flex items-center justify-between text-[#ffffff]">
                <span className="text-[12px] font-semibold flex items-center gap-1 leading-4">
                  <CheckCircle size={16} className="text-[#9cf6bc]" />
                  Form 20B Seal Matched
                </span>

                <span className="text-[11px] bg-[#ffffff]/20 backdrop-blur-md px-2 py-0.5 rounded leading-4">
                  100% OCR Match
                </span>
              </div>
            </div>
          </div>

          {/* Verification Audit Note */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
              Verification Audit Note
            </label>

            <textarea
              className="w-full p-2 bg-[#f1f3ff] text-[#171c24] rounded-lg text-[14px] focus:outline-none focus:bg-[#ffffff] focus:ring-1 focus:ring-[#235eac] resize-none leading-5"
              placeholder="Provide reason or operational conditions (optional for approval)..."
              rows="2"
            ></textarea>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-[#ffffff] border-t border-[#eaedfa] flex flex-col gap-2">

          <button
            className="w-full py-2 px-4 bg-[#006d40] text-[#ffffff] rounded-lg text-[14px] font-semibold shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-1.5 leading-5"
            type="button"
          >
            <UserCheck size={18} />
            <span>Approve Verification & Open Credit</span>
          </button>

          <button
            className="w-full py-2 px-4 bg-[#ffdad6] text-[#93000a] hover:bg-[#ba1a1a] hover:text-[#ffffff] rounded-lg text-[14px] font-semibold transition-all flex items-center justify-center gap-1.5 leading-5"
            type="button"
          >
            <Ban size={18} />
            <span>Reject Application</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default VerificationDrawer;