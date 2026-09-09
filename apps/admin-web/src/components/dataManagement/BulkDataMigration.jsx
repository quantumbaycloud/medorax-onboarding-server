import React from "react";

import SchemaSelector from "./SchemaSelector";
import FileUploadZone from "./FileUploadZone";
import ImportPipelineJobs from "./ImportPipelineJobs";

const BulkDataMigration = ({
  data = {},
  selectedSchema,
  dryRun,
  selectedFile,
  onSchemaSelect,
  onDryRunChange,
  onFileSelect,
  onIngest,
  onTemplates,
  onArtifactClick,
}) => {
  const migration = data?.migration || {};

  return (
    <section className="flex min-w-0 w-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
      <div className="flex min-w-0 items-center justify-between gap-3 bg-slate-50/70 p-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#235EAC] text-white">
            ↑
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-800">
              {migration?.title ||
                "Bulk Data Import & Migration"}
            </h2>

            <p className="truncate text-[9px] text-slate-500">
              {migration?.subtitle || ""}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onTemplates}
          className="shrink-0 text-[10px] font-semibold text-blue-700 hover:underline"
        >
          ↓{" "}
          {migration?.templates?.label ||
            "CSV Templates"}
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-3 p-4">
        <SchemaSelector
          schema={migration?.schema}
          selectedId={selectedSchema}
          onSelect={onSchemaSelect}
        />

        <FileUploadZone
          config={migration?.upload}
          onFileSelect={onFileSelect}
        />

        {selectedFile && (
          <div className="min-w-0 truncate rounded bg-green-50 px-3 py-2 text-[10px] text-green-800">
            <span className="font-bold">
              Selected:
            </span>{" "}
            {selectedFile.name}
          </div>
        )}

        <div className="flex items-center justify-between rounded bg-slate-50 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-700">✓</span>

            <span className="text-[10px] font-semibold text-slate-700">
              {migration?.validation?.label ||
                "Pre-validation Dry Run"}
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={dryRun}
            onClick={() =>
              onDryRunChange?.(!dryRun)
            }
            className={`relative h-5 w-9 shrink-0 rounded-full transition ${
              dryRun
                ? "bg-[#235EAC]"
                : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                dryRun ? "left-4" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={onIngest}
          className="flex w-full items-center justify-center gap-1.5 rounded bg-[#235EAC] px-3 py-2 text-[10px] font-bold text-white transition hover:bg-[#1D4F91]"
        >
          ↑{" "}
          {migration?.ingestion?.label ||
            "Initiate Module Ingestion"}
        </button>
      </div>

      <ImportPipelineJobs
        jobs={migration?.jobs}
        onArtifactClick={onArtifactClick}
      />
    </section>
  );
};

export default BulkDataMigration;