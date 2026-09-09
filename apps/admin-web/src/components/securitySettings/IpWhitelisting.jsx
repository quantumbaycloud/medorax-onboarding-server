import SecurityIcon from "./SecurityIcon";

const IpWhitelisting = ({
  data,
  cidrs,
  inputValue,
  onInputChange,
  onAddCidr,
  onRemoveCidr,
  geofencingEnabled,
  onToggleGeofencing,
}) => {
  return (
    <div className="flex flex-col justify-between space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F3FF] text-[#235EAC]">
            <SecurityIcon name={data.icon} size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#171C24]">
              {data.title}
            </h2>

            <p className="text-sm text-[#424751]">
              {data.description}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#171C24]">
                {data.cidr.label}
              </label>

              <span className="text-xs text-[#424751]">
                {cidrs.length} Active Blocks
              </span>
            </div>

            <div className="flex min-h-[52px] flex-wrap gap-1 rounded-xl bg-[#F1F3FF] p-2">
              {cidrs.map((cidr) => (
                <span
                  key={cidr.id}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-[#006D40]" />

                  <span className="font-mono text-[#171C24]">
                    {cidr.value}
                  </span>

                  <span className="text-[#424751]">
                    ({cidr.description})
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveCidr(cidr.id)}
                    className="ml-1 text-[#424751] transition hover:text-[#BA1A1A]"
                    aria-label={`Remove ${cidr.value}`}
                  >
                    <SecurityIcon name="close" size={15} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <form
            onSubmit={onAddCidr}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) =>
                onInputChange(e.target.value)
              }
              placeholder={data.cidr.placeholder}
              className="h-10 min-w-0 flex-1 rounded-lg bg-[#F1F3FF] px-4 text-sm text-[#171C24] outline-none placeholder:text-[#424751]/60 focus:bg-white focus:ring-2 focus:ring-[#235EAC]/20"
            />

            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center gap-1 rounded-lg bg-[#EAEDFA] px-4 text-sm font-medium text-[#235EAC] transition hover:bg-[#E5E8F4]"
            >
              <SecurityIcon
                name={data.addCidr.icon}
                size={18}
              />
              {data.addCidr.label}
            </button>
          </form>

          <div className="flex items-center justify-between rounded-xl bg-[#F1F3FF] p-4">
            <div className="pr-4">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-[#171C24]">
                  {data.geofencing.label}
                </span>

                <span className="rounded bg-[#9CF6BC] px-1.5 py-0.5 text-[11px] font-semibold text-[#00522F]">
                  {geofencingEnabled
                    ? data.geofencing.status
                    : "Inactive"}
                </span>
              </div>

              <p className="mt-1 text-xs text-[#424751]">
                {data.geofencing.description}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={geofencingEnabled}
              onClick={onToggleGeofencing}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                geofencingEnabled
                  ? "bg-[#006D40]"
                  : "bg-[#C3C6D2]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                  geofencingEnabled
                    ? "left-5"
                    : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 text-xs text-[#424751]">
        <span>
          {data.inboundRequest.label}:{" "}
          <span className="font-mono text-[#171C24]">
            {data.inboundRequest.value}
          </span>
        </span>

        <span className="flex items-center gap-1 font-medium text-[#006D40]">
          <span className="h-2 w-2 rounded-full bg-[#006D40]" />
          {data.inboundRequest.status}
        </span>
      </div>
    </div>
  );
};

export default IpWhitelisting;