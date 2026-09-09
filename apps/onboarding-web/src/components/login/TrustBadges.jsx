// src/components/login/TrustBadges.jsx
import { ShieldCheck, Shield, HeartPulse } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Shield, label: "AES-256 Encrypted" },
  { icon: HeartPulse, label: "HL7 / FHIR Certified" },
];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-4">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white text-sm font-medium flex items-center gap-2"
        >
          <Icon size={18} className="text-[#4fdbc8]" />
          {label}
        </div>
      ))}
    </div>
  );
}