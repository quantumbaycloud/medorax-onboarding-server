import SecurityIcon from "./SecurityIcon";

const SecuritySettingsFooter = ({
  data,
  onReset,
  onSave,
}) => {
  return (
    <div className="sticky bottom-4 z-30 flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-xl sm:flex-row">
      <div className="flex items-center gap-2 text-[#424751]">
        <SecurityIcon
          name={data.auditIcon}
          size={20}
          className="text-[#235EAC]"
        />

        <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:gap-2">
          <span className="font-medium text-[#171C24]">
            {data.auditLabel}
          </span>

          <span>
            {data.auditText}{" "}
            <strong className="text-[#171C24]">
              {data.auditor}
            </strong>{" "}
            on {data.auditDate}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-4 py-2 text-sm font-medium text-[#424751] transition hover:bg-[#EAEDFA] hover:text-[#171C24]"
        >
          {data.resetLabel}
        </button>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-lg bg-[#235EAC] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1D4F91]"
        >
          <SecurityIcon
            name={data.saveIcon}
            size={18}
          />

          {data.saveLabel}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettingsFooter;