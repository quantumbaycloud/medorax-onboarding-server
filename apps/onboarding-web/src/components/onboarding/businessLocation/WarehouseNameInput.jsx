export default function WarehouseNameInput({
  businessType,
  value,
  setLocationData,
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[3px] font-semibold text-slate-500 mb-2">
        {businessType === "Distributor"
          ? "Warehouse Name"
          : "Pharmacy Name"}
      </label>

      <input
        type="text"
        value={value || ""}
        placeholder={
          businessType === "Distributor"
            ? "Enter Warehouse Name"
            : "Enter Pharmacy Name"
        }
        onChange={(e) =>
          setLocationData((prev) => ({
            ...prev,
            warehouseName: e.target.value,
          }))
        }
        className="
          w-full
          h-12
          rounded-xl
          bg-slate-100
          px-4
          border
          border-transparent
          outline-none
          focus:border-[#2563EB]
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}