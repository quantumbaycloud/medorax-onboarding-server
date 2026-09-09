import SecurityIcon from "./SecurityIcon";

const SecuritySignalBanner = ({ data }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAEDFA] text-[#235EAC]">
          <SecurityIcon name={data.icon} size={22} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#171C24]">
              {data.title}
            </span>

            <span className="rounded bg-[#9CF6BC] px-1.5 py-0.5 text-[11px] font-semibold text-[#00522F]">
              {data.badge}
            </span>
          </div>

          <p className="text-xs text-[#424751]">
            {data.description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-end text-sm font-medium text-[#171C24] md:self-auto">
        <SecurityIcon
          name={data.certificationIcon}
          size={18}
          className="text-[#006D40]"
        />
        {data.certification}
      </div>
    </div>
  );
};

export default SecuritySignalBanner;