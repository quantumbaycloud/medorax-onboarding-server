import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Building2,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  Mail,
  User,
  ShieldCheck,
} from "lucide-react";
import client from "../api/client";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        const response = await client.get(
          "/api/onboarding/application-status"
        );

        const result = response.data;

        if (!mounted) return;

        if (
          result?.status !== "approved"
        ) {
          if (result?.status === "pending") {
            navigate("/onboarding-complete", { replace: true });
          } else {
            navigate("/business-type", { replace: true });
          }
          return;
        }

        setData(result);
      } catch (error) {
        console.error("Dashboard load failed:", error);

        if (error?.response?.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        toast.error("Unable to load your dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy");
    }
  };

  const handleLogout = async () => {
    try {
      await client.post("/api/auth/logout");
    } catch (error) {
      console.warn("Logout request failed:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");

      navigate("/login", { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0EA5A4] rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-[#131B2E]">
              MEDORAX
            </div>
            <div className="text-xs text-slate-500">
              Onboarding Dashboard
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#131B2E]">
              Welcome{data.fullName ? `, ${data.fullName}` : ""}
            </h1>

            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              <CheckCircle2 size={15} />
              Approved
            </div>
          </div>

          <p className="mt-2 text-slate-500">
            Your Medorax account and ERP access are ready.
          </p>
        </div>

        {/* Account Information */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#131B2E] mb-5">
              Account Information
            </h2>

            <div className="space-y-4">
              <InfoRow
                icon={<User size={18} />}
                label="Full Name"
                value={data.fullName || "-"}
              />

              <InfoRow
                icon={<Mail size={18} />}
                label="Email"
                value={data.email || "-"}
              />

              <InfoRow
                icon={<Building2 size={18} />}
                label="Business Type"
                value={data.businessType || "-"}
              />

              <InfoRow
                icon={<ShieldCheck size={18} />}
                label="Application"
                value="Approved"
              />
            </div>
          </div>

          {/* License */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#131B2E] mb-5">
              License Information
            </h2>

            <div className="space-y-4">
              <InfoRow
                icon={<KeyRound size={18} />}
                label="Pharmacy / Business ID"
                value={data.pharmacyId || "-"}
              />

              <InfoRow
                icon={<KeyRound size={18} />}
                label="License Key"
                value={data.licenseKey || "-"}
                copyable={!!data.licenseKey}
                onCopy={() =>
                  copyText(data.licenseKey, "License key")
                }
              />

              <InfoRow
                icon={<ShieldCheck size={18} />}
                label="License Number"
                value={data.licenseNumber || "-"}
              />

              <InfoRow
                icon={<ShieldCheck size={18} />}
                label="License Expires"
                value={
                  data.licenseExpiresAt
                    ? new Date(
                        data.licenseExpiresAt
                      ).toLocaleDateString("en-IN")
                    : "-"
                }
              />
            </div>
          </div>
        </section>

        {/* ERP Credentials */}
        <section className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#131B2E]">
                  ERP Login Credentials
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Use these credentials to access your Medorax ERP.
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                Ready
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-5">
            <CredentialBox
              label="ERP Username"
              value={data.erpUsername || "-"}
              onCopy={() =>
                copyText(data.erpUsername, "ERP username")
              }
            />

            <CredentialBox
              label="Temporary Password"
              value={data.temporaryPassword || "Password unavailable"}
              hidden={
                !showPassword &&
                !!data.temporaryPassword
              }
              onCopy={() =>
                data.temporaryPassword &&
                copyText(
                  data.temporaryPassword,
                  "ERP password"
                )
              }
            >
              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </CredentialBox>
          </div>

          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={() =>
                toast("ERP launch can be connected here.")
              }
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-semibold hover:shadow-lg transition"
            >
              Go to ERP
            </button>
          </div>
        </section>

        <div className="mt-6 text-sm text-slate-500">
          Keep your ERP password secure and do not share it with others.
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  copyable,
  onCopy,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500">
          {label}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <div className="font-medium text-slate-800 break-all">
            {value}
          </div>

          {copyable && (
            <button
              type="button"
              onClick={onCopy}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
              title="Copy"
            >
              <Copy size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CredentialBox({
  label,
  value,
  hidden = false,
  onCopy,
  children,
}) {
  const displayValue = hidden
    ? "•".repeat(Math.min(value.length || 8, 18))
    : value;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-medium text-slate-500 mb-2">
        {label}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0 font-mono text-sm text-slate-800 break-all bg-white border border-slate-200 rounded-lg px-3 py-3">
          {displayValue}
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
          title="Copy"
        >
          <Copy size={17} />
        </button>

        {children}
      </div>
    </div>
  );
}
