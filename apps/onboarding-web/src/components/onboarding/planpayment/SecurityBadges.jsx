// SecurityBadges.jsx
import { ShieldCheck, Lock, BadgeCheck } from "lucide-react";

export default function SecurityBadges() {
  const badges = [
    { title: "HIPAA", subtitle: "Privacy", icon: ShieldCheck },
    { title: "SOC 2", subtitle: "Certified", icon: BadgeCheck },
    { title: "AES-256", subtitle: "Encrypted", icon: Lock },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.title}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0EA5A4]/10">
              <Icon size={16} className="text-[#0EA5A4]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold">{badge.title}</h4>
              <p className="text-[9px] text-slate-500">{badge.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}