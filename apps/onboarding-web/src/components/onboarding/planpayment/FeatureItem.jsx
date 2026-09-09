import {
  Package,
  Brain,
  Truck,
  Headphones,
} from "lucide-react";

const icons = {
  inventory: Package,
  ocr: Brain,
  truck: Truck,
  support: Headphones,
};

export default function FeatureItem({ feature }) {
  const Icon = icons[feature.icon];

  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        transition-all
        hover:border-[#0EA5A4]/30
        hover:shadow-sm
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-[#0EA5A4]/10
        "
      >
        <Icon
          size={20}
          className="text-[#0EA5A4]"
        />
      </div>

      <span className="text-sm font-semibold text-slate-800">
        {feature.title}
      </span>
    </div>
  );
} 