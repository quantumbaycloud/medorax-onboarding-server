import { Pencil } from "lucide-react";

export default function AddressTextarea({
  value = "",
  setBusinessData,
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[3px] font-semibold text-slate-500 mb-2">
        Business Address
      </label>

      <div className="relative">
        <textarea
          rows={4}
          value={value}
          placeholder="Select a location on the map..."
          onChange={(e) =>
            setBusinessData((prev) => ({
              ...prev,
              formattedAddress: e.target.value,
            }))
          }
          className="
            w-full
            rounded-xl
            bg-slate-100
            p-4
            pr-20
            resize-none
            outline-none
            border
            border-transparent
            focus:bg-white
            focus:border-[#2563EB]
            focus:ring-4
            focus:ring-blue-100
            transition
          "
        />

        <button
          type="button"
          className="
            absolute
            right-4
            top-4
            flex
            items-center
            gap-1
            text-[#006B5F]
            hover:text-[#2563EB]
            transition
          "
        >
          <Pencil size={16} />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>
    </div>
  );
}