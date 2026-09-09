import React, { useMemo, useState } from "react";

import { DATA_MANAGEMENT } from "../../constants/dataManagement";

import DataManagementHeader from "./DataManagementHeader";
import DataManagementStats from "./DataManagementStats";
import BackupRecovery from "./BackupRecovery";
import BulkDataMigration from "./BulkDataMigration";
import AdvancedDiagnostics from "./AdvancedDiagnostics";
import DataManagementToast from "./DataManagementToast";

const DataManagement = () => {
  const data = DATA_MANAGEMENT;

  const schemaOptions = useMemo(
    () => data?.migration?.schema?.options || [],
    [data]
  );

  const [selectedSchema, setSelectedSchema] = useState(
    schemaOptions[0]?.id || ""
  );

  const [dryRun, setDryRun] = useState(
    Boolean(data?.migration?.validation?.defaultEnabled)
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [toast, setToast] = useState("");
  const [isBackingUp, setIsBackingUp] = useState(false);

  const showToast = (message) => {
    if (!message) return;
    setToast(message);
  };

  const handleManualBackup = () => {
    if (isBackingUp) return;

    setIsBackingUp(true);
    showToast(data?.messages?.backupStarted);

    window.setTimeout(() => {
      setIsBackingUp(false);
      showToast(data?.messages?.manualBackupSuccess);
    }, 1500);
  };

  const handleBackupNow = () => {
    if (isBackingUp) return;

    setIsBackingUp(true);
    showToast(data?.messages?.backupStarted);

    window.setTimeout(() => {
      setIsBackingUp(false);
      showToast(data?.messages?.backupSuccess);
    }, 1500);
  };

  const handleAuditTrail = () => {
    showToast(data?.messages?.auditTrail);
  };

  const handleSchemaSelect = (schemaId) => {
    const exists = schemaOptions.some(
      (option) => option?.id === schemaId
    );

    if (!exists) return;

    setSelectedSchema(schemaId);
    showToast(data?.messages?.schemaSelected);
  };

  const handleFileSelect = (file, result = {}) => {
    if (!file || !result.valid) {
      setSelectedFile(null);
      showToast(data?.messages?.invalidFile);
      return;
    }

    setSelectedFile(file);
    showToast(data?.messages?.fileSelected);
  };

  const handleIngestion = () => {
    if (!selectedSchema) {
      showToast("Please select a destination module first.");
      return;
    }

    if (!selectedFile) {
      showToast("Please select a file before ingestion.");
      return;
    }

    showToast(data?.messages?.ingestionStarted);
  };

  const handleTemplates = () => {
    showToast(data?.messages?.templates);
  };

  const handleDownload = (snapshot) => {
    if (!snapshot?.id) return;
    showToast(data?.messages?.download);
  };

  const handleRestore = (snapshot) => {
    if (!snapshot?.id) return;
    showToast(data?.messages?.restore);
  };

  const handleViewAll = () => {
    showToast(data?.messages?.viewSnapshots);
  };

  const handleArtifactClick = (job) => {
    if (!job?.id) return;

    let message = data?.messages?.export;

    if (job?.artifactIcon === "warning") {
      message = data?.messages?.errorLog;
    } else if (job?.artifactIcon === "receipt") {
      message = data?.messages?.summaryLog;
    }

    showToast(message);
  };

  const handleInspect = () => {
    showToast(data?.messages?.replication);
  };

  const handleFailover = () => {
    showToast(data?.messages?.failover);
  };

  return (
    <main className="w-full min-w-0 flex-1 overflow-x-hidden bg-background p-4 md:p-6">
      <div className="mx-auto flex w-full min-w-0 max-w-[1600px] flex-col gap-5">
        <DataManagementHeader
          data={data}
          onAuditTrail={handleAuditTrail}
          onManualBackup={handleManualBackup}
          isBackingUp={isBackingUp}
        />

        <DataManagementStats stats={data?.telemetry} />

        {/* IMPORTANT:
            min-w-0 prevents children from forcing the grid wider.
        */}
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-7">
            <BackupRecovery
              data={data}
              onBackupNow={handleBackupNow}
              onDownload={handleDownload}
              onRestore={handleRestore}
              onViewAll={handleViewAll}
            />
          </div>

          <div className="min-w-0 xl:col-span-5">
            <BulkDataMigration
              data={data}
              selectedSchema={selectedSchema}
              dryRun={dryRun}
              selectedFile={selectedFile}
              onSchemaSelect={handleSchemaSelect}
              onDryRunChange={setDryRun}
              onFileSelect={handleFileSelect}
              onIngest={handleIngestion}
              onTemplates={handleTemplates}
              onArtifactClick={handleArtifactClick}
            />
          </div>
        </div>

        <AdvancedDiagnostics
          data={data}
          onInspect={handleInspect}
          onFailover={handleFailover}
        />
      </div>

      <DataManagementToast
        message={toast}
        onClose={() => setToast("")}
      />
    </main>
  );
};

export default DataManagement;