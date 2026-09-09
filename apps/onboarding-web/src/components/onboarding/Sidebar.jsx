import { Flame, ShieldCheck, Briefcase, Building2, FileText, Landmark, CreditCard, CircleHelp, CheckCircle2, Lock, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import client from "../../api/client";

export default function Sidebar({ active = "Verification" }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const part1Complete = localStorage.getItem("onboardingPart1Complete") === "true";

  useEffect(() => {
    let mounted = true;
    client.get("/api/auth/me")
      .then(() => mounted && setIsAuthenticated(true))
      .catch(() => mounted && setIsAuthenticated(false));
    return () => { mounted = false; };
  }, []);

  const steps = [
    { name: "Welcome", icon: Flame, part: 1, displayName: "Welcome" },
    { name: "Verification", icon: ShieldCheck, part: 1, displayName: "Verification" },
    { name: "Business Type", icon: Building2, part: 2, displayName: "Business Type" },
    { name: "Business Info", icon: Briefcase, part: 2, displayName: "Business Info" },
    { name: "Documents", icon: FileText, part: 2, displayName: "Documents" },
    { name: "Plan & Payment", icon: CreditCard, part: 2, displayName: "Plan & Payment" },
    { name: "Bank Setup", icon: Landmark, part: 2, displayName: "Bank Setup" },
    { name: "Review & Setup", icon: CheckCircle2, part: 2, displayName: "Review & Setup" },
  ];

  const activeIndex = steps.findIndex((step) => step.name === active);
  const isStepLocked = (index) => steps[index].part === 2 && !isAuthenticated;
  const isStepCompleted = (index) => index < 2 ? part1Complete : index < activeIndex && isAuthenticated;
  const getStepStatus = (index) => isStepLocked(index) ? "locked" : isStepCompleted(index) ? "completed" : index === activeIndex ? "active" : "pending";

  const renderStepName = (step, locked) => locked ? (
    <span className="flex items-center flex-wrap gap-0.5">
      {step.displayName.split(" ").slice(0, -1).join(" ")}{step.displayName.includes(" ") && " "}
      <span className="inline-flex items-center gap-0.5"><Lock size={11} className="text-slate-400" /><span>{step.displayName.split(" ").slice(-1)[0]}</span></span>
    </span>
  ) : step.displayName;

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try { await client.post("/api/auth/logout"); }
    catch (error) { console.error("Logout failed:", error); }
    finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <aside className="w-full h-full bg-white flex flex-col">
      <div className="px-5 py-3.5 border-b border-slate-100 shrink-0">
        <h2 className="text-lg font-bold text-[#006B5F] tracking-tight">MEDORAX ERP</h2>
        <p className="text-[10px] text-slate-500 mt-0.5">{isAuthenticated ? "Onboarding Progress" : "Account Setup"}</p>
      </div>

      <div className="flex-1 px-3 py-2 flex flex-col">
        <div className="space-y-0.5">
          {steps.slice(0, 2).map((step, index) => {
            const Icon = step.icon, status = getStepStatus(index), locked = status === "locked", completed = status === "completed", activeStep = status === "active";
            return <div key={step.name} className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${activeStep ? "bg-[#E7F7F3] text-[#006B5F] border-l-2 border-[#006B5F]" : ""} ${completed ? "text-green-700" : ""} ${locked ? "opacity-50 cursor-not-allowed" : ""} ${!activeStep && !completed && !locked ? "hover:bg-slate-50 text-slate-600" : ""}`}>
              <Icon size={16} className={`shrink-0 ${activeStep ? "text-[#006B5F]" : completed ? "text-green-500" : "text-slate-500"}`} />
              <span className={`text-sm font-medium flex-1 ${activeStep ? "font-semibold" : ""}`}>{step.displayName}</span>
              {completed && <CheckCircle2 size={14} className="text-green-500 shrink-0" />}
            </div>;
          })}
        </div>

        <div className="relative my-2.5"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-[8px] font-semibold uppercase tracking-wider text-slate-400">{isAuthenticated ? "Business Setup" : "🔒 Business Setup"}</span></div></div>

        <div className="space-y-0.5">
          {steps.slice(2).map((step, index) => {
            const actualIndex = index + 2, Icon = step.icon, status = getStepStatus(actualIndex), locked = status === "locked", completed = status === "completed", activeStep = status === "active";
            return <div key={step.name} className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-200 relative ${locked ? "opacity-40 blur-[0.5px] cursor-not-allowed bg-slate-50/30" : ""} ${activeStep ? "bg-[#E7F7F3] text-[#006B5F] border-l-2 border-[#006B5F]" : ""} ${completed ? "text-green-700" : ""} ${!activeStep && !completed && !locked ? "hover:bg-slate-50 text-slate-600" : ""}`}>
              <Icon size={16} className={`shrink-0 ${locked ? "text-slate-300" : activeStep ? "text-[#006B5F]" : completed ? "text-green-500" : "text-slate-500"}`} />
              <span className={`text-sm font-medium flex-1 ${activeStep ? "font-semibold" : ""} ${locked ? "text-slate-400" : ""}`}>{renderStepName(step, locked)}</span>
              {completed && !locked && <CheckCircle2 size={14} className="text-green-500 shrink-0" />}
            </div>;
          })}
        </div>

        {!isAuthenticated && <div className="mt-2 rounded-lg bg-amber-50/80 border border-amber-200/60 px-3 py-1.5"><div className="flex items-center gap-2"><Lock size={11} className="text-amber-500 shrink-0" /><p className="text-[9px] text-amber-700 font-medium">Login to access business setup</p></div></div>}
        <div className="flex-1 min-h-3" />

        <button type="button" className={`w-full rounded-lg border border-slate-200 py-2 flex items-center justify-center gap-2 text-[10px] font-medium transition ${isAuthenticated ? "text-[#006B5F] hover:bg-slate-50" : "text-slate-400"}`}><CircleHelp size={14} />{isAuthenticated ? "Need Help?" : "Help Center"}</button>

        {isAuthenticated && <button type="button" onClick={handleLogout} disabled={loggingOut} className="mt-2 w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 flex items-center justify-center gap-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 hover:border-red-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"><LogOut size={14} className={loggingOut ? "animate-pulse" : ""} />{loggingOut ? "Logging out..." : "Logout"}</button>}
      </div>
    </aside>
  );
}
