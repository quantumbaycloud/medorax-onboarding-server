import SecurityIcon from "./SecurityIcon";

const SecuritySettingsHeader = ({
  data,
  onSave,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs text-[#424751]">
          <span className="cursor-pointer hover:text-[#235EAC]">
            {data.page.breadcrumb[0]}
          </span>

          <span className="text-[#737782]">›</span>

          <span className="font-semibold text-[#235EAC]">
            {data.page.breadcrumb[1]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#171C24]">
            {data.page.title}
          </h1>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#9CF6BC] px-2 py-1 text-xs font-semibold text-[#00522F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#006D40]" />
            {data.page.status}
          </span>
        </div>

        <p className="max-w-2xl text-sm text-[#424751]">
          {data.page.description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#424751] shadow-sm transition hover:bg-[#EAEDFA] hover:text-[#171C24]"
        >
          <SecurityIcon name={data.headerActions.history.icon} size={18} />
          {data.headerActions.history.label}
        </button>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-lg bg-[#235EAC] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1D4F91]"
        >
          <SecurityIcon name={data.headerActions.save.icon} size={18} />
          {data.headerActions.save.label}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettingsHeader;