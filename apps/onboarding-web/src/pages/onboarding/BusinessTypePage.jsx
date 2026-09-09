// src/pages/onboarding/BusinessTypePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Warehouse } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import BusinessTypeCard from "../../components/onboarding/bussinesType/BusinessTypeCard";
import ProgressHeader from "../../components/onboarding/bussinesType/ProgressHeader";
import InfoCard from "../../components/onboarding/bussinesType/InfoCard";
import {
  selectBusinessType,
  BUSINESS_TYPES,
} from "../../api/onboarding/businessTypeApi";

export default function BusinessTypePage() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selected) {
      toast.error("Please select a Business Type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const businessTypeValue =
        BUSINESS_TYPES[selected.toUpperCase()];

      console.log("📤 Sending business type:", {
        businessType: businessTypeValue,
        selected,
      });

      // Authentication is handled by the HttpOnly cookie.
      // Do NOT read accessToken from localStorage.
      const response = await selectBusinessType({
        businessType: businessTypeValue,
      });

      console.log("✅ Business type saved:", response);

      // These are UI/onboarding values only.
      // They are NOT authentication tokens.
      localStorage.setItem("businessType", selected);
      localStorage.setItem(
        "businessTypeValue",
        businessTypeValue.toString()
      );

      navigate("/business-location");
    } catch (err) {
      console.error("❌ Error saving business type:", err);

      const status = err.response?.status || err.status;
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Failed to save business type. Please try again.";

      setError(errorMessage);

      if (status === 401) {
        toast.error("Your session has expired. Please login again.");

        // IMPORTANT:
        // Do NOT remove accessToken/refreshToken from localStorage.
        // They are HttpOnly cookies and cannot/should not be handled here.

        navigate("/login", {
          replace: true,
          state: {
            from: "/business-type",
          },
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <VerificationLayout active="Business Type">
      {/* ================= MOBILE ================= */}
      <div className="block md:hidden w-full max-w-7xl mx-auto h-full flex flex-col">

        {/* Header */}
        <div className="flex-shrink-0 px-4 pt-4 bg-white z-10">
          <ProgressHeader
            step={3}
            totalSteps={6}
            progress={50}
          />
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-4 py-4">

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-4"
          >
            <BusinessTypeCard
              selected={selected === "Distributor"}
              onClick={() => setSelected("Distributor")}
              icon={
                <Warehouse
                  size={42}
                  className="text-[#006B5F]"
                  strokeWidth={1.8}
                />
              }
              title="Distributor"
              description="Wholesale supply chain specialist. Manage inventory, bulk shipments and logistics between manufacturers and pharmacies."
              buttonText="Select Distributor"
            />

            <BusinessTypeCard
              selected={selected === "Pharmacy"}
              onClick={() => setSelected("Pharmacy")}
              icon={
                <Building2
                  size={42}
                  className="text-[#2563EB]"
                  strokeWidth={1.8}
                />
              }
              title="Pharmacy"
              description="Manage prescriptions, medicines, inventory, billing and patient records from one unified platform."
              buttonText="Select Pharmacy"
            />
          </motion.div>

          <div className="hidden md:block mt-3">
            <InfoCard />
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 pb-4 pt-3 bg-white border-t border-slate-100 z-10">
          <div className="flex flex-col gap-3">

            <div className="flex flex-col sm:flex-row gap-3 w-full">

              <button
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-300
                  hover:border-[#006B5F]
                  transition
                  text-sm
                  w-full
                "
                onClick={() => navigate("/business-location")}
              >
                Skip for now
              </button>

              <motion.button
                whileHover={{ scale: selected ? 1.03 : 1 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selected || loading}
                onClick={handleContinue}
                className={`
                  px-6
                  py-2.5
                  rounded-xl
                  text-white
                  font-semibold
                  shadow-lg
                  transition-all
                  text-sm
                  w-full
                  ${
                    selected
                      ? "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]"
                      : "bg-slate-300 cursor-not-allowed"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Continue"
                )}
              </motion.button>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 text-slate-600 hover:text-[#006B5F] transition text-sm"
            >
              ← Back to Verification
            </button>

          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block w-full max-w-7xl mx-auto h-full flex flex-col justify-between px-5 lg:px-8 py-6 lg:py-1">

        {/* Header */}
        <ProgressHeader
          step={3}
          totalSteps={6}
          progress={50}
        />

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-6 mt-6"
        >
          <BusinessTypeCard
            selected={selected === "Distributor"}
            onClick={() => setSelected("Distributor")}
            icon={
              <Warehouse
                size={42}
                className="text-[#006B5F]"
                strokeWidth={1.8}
              />
            }
            title="Distributor"
            description="Wholesale supply chain specialist. Manage inventory, bulk shipments and logistics between manufacturers and pharmacies."
            buttonText="Select Distributor"
          />

          <BusinessTypeCard
            selected={selected === "Pharmacy"}
            onClick={() => setSelected("Pharmacy")}
            icon={
              <Building2
                size={42}
                className="text-[#2563EB]"
                strokeWidth={1.8}
              />
            }
            title="Pharmacy"
            description="Manage prescriptions, medicines, inventory, billing and patient records from one unified platform."
            buttonText="Select Pharmacy"
          />
        </motion.div>

        {/* Info */}
        <div className="mt-4">
          <InfoCard />
        </div>

        {/* Footer */}
        <div className="mt-1 flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-[#006B5F] transition"
          >
            ← Back to Verification
          </button>

          <div className="flex gap-3">

            <button
              className="
                px-7
                py-2.5
                rounded-xl
                border
                border-slate-300
                hover:border-[#006B5F]
                transition
              "
              onClick={() => navigate("/business-location")}
            >
              Skip for now
            </button>

            <motion.button
              whileHover={{ scale: selected ? 1.03 : 1 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selected || loading}
              onClick={handleContinue}
              className={`
                px-8
                py-2.5
                rounded-xl
                text-white
                font-semibold
                shadow-lg
                transition-all
                ${
                  selected
                    ? "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]"
                    : "bg-slate-300 cursor-not-allowed"
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Continue"
              )}
            </motion.button>

          </div>
        </div>
      </div>
    </VerificationLayout>
  );
}