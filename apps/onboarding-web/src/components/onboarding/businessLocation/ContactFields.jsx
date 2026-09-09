import { User, Phone } from "lucide-react";

export default function ContactFields({
  locationData,
  setLocationData,
  isMobile = false,
}) {
  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
      <div>
        <label className="block text-xs uppercase tracking-[3px] font-semibold text-slate-500 mb-2">
          Contact Person
        </label>
        <div className="relative">
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            name="contactPerson"
            value={locationData.contactPerson || ""}
            onChange={(e) =>
              setLocationData(prev => ({
                ...prev,
                contactPerson: e.target.value
              }))
            }
            placeholder="Contact Person Name"
            className="w-full h-12 rounded-xl bg-slate-100 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[3px] font-semibold text-slate-500 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="tel"
            name="contactNumber"
            value={locationData.contactNumber || ""}
            onChange={(e) =>
              setLocationData(prev => ({
                ...prev,
                contactNumber: e.target.value
              }))
            }
            placeholder="+91 9876543210"
            className="w-full h-12 rounded-xl bg-slate-100 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </div>
  );
}