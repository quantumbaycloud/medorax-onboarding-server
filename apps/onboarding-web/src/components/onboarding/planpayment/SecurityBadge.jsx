export default function SecurityBadge({
  title,
  subtitle,
  icon,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A4]/10">

        {icon}

      </div>

      <div>

        <h4 className="text-sm font-semibold">
          {title}
        </h4>

        <p className="text-xs text-slate-500">
          {subtitle}
        </p>

      </div>

    </div>
  );
}