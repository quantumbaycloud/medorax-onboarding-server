import {
  Receipt,
  Pill,
  CreditCard,
  Fingerprint,
  Building2,
} from "lucide-react";

export default function DocumentIcon({
  icon,
}) {
  const icons = {
    receipt: Receipt,
    pill: Pill,
    card: CreditCard,
    fingerprint: Fingerprint,
    building: Building2,
  };

  const Icon =
    icons[icon] || Receipt;

  return (
    <div
      className="
      w-14
      h-14
      rounded-xl
      bg-[#0EA5A4]/10
      flex
      items-center
      justify-center
    "
    >
      <Icon
        size={28}
        className="text-[#006B5F]"
      />
    </div>
  );
}