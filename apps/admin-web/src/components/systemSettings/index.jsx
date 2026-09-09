import { useState } from "react";

import { SYSTEM_SETTINGS } from "../../constants/systemSettings";

import SystemSettingsHeader from "./SystemSettingsHeader";
import SystemSettingsTabs from "./SystemSettingsTabs";
import CompanyProfile from "./CompanyProfile";
import StatutoryLicensing from "./StatutoryLicensing";
import OperatingBranches from "./OperatingBranches";
import TaxGSTRates from "./TaxGSTRates";
import FacilityDistribution from "./FacilityDistribution";
import AuditTrailSignoff from "./AuditTrailSignoff";
import CurrencyUnits from "./CurrencyUnits";
import IntegrationDefaults from "./IntegrationDefaults";

const SystemSettings = () => {
  const [settings, setSettings] = useState(() => ({
    ...SYSTEM_SETTINGS,

    company: {
      ...SYSTEM_SETTINGS.company,
      logoUrl: "",
      logoFile: null,
    },
  }));

  const [activeTab, setActiveTab] = useState(SYSTEM_SETTINGS.tabs[0]?.id || "");

  const [showToast, setShowToast] = useState(false);

  // =========================
  // Company Update
  // =========================
  const handleCompanyChange = (field, value) => {
    setSettings((previous) => ({
      ...previous,

      company: {
        ...previous.company,
        [field]: value,
      },
    }));
  };

  // =========================
  // Licensing Update
  // =========================
  const handleLicensingChange = (field, value) => {
    setSettings((previous) => ({
      ...previous,

      licensing: {
        ...previous.licensing,
        [field]: value,
      },
    }));
  };

  // =========================
  // Tax Edit
  // =========================
  const handleTaxEdit = (tax) => {
    const newRate = window.prompt(`Enter GST rate for ${tax.name}`, tax.rate);

    if (newRate === null || newRate.trim() === "") {
      return;
    }

    setSettings((previous) => ({
      ...previous,

      taxRates: previous.taxRates.map((item) =>
        item.id === tax.id
          ? {
              ...item,
              rate: newRate,
            }
          : item,
      ),
    }));
  };

  // =========================
  // Branch Edit
  // =========================
  const handleBranchEdit = (branch) => {
    const manager = window.prompt(
      `Enter manager for ${branch.facility}`,
      branch.manager,
    );

    if (manager === null || manager.trim() === "") {
      return;
    }

    setSettings((previous) => ({
      ...previous,

      branches: previous.branches.map((item) =>
        item.id === branch.id
          ? {
              ...item,
              manager,
            }
          : item,
      ),
    }));
  };

  // =========================
  // Add Branch
  // =========================
  const handleAddBranch = () => {
    const facility = window.prompt("Enter branch facility name");

    if (!facility || facility.trim() === "") {
      return;
    }

    const newBranch = {
      id: Date.now(),
      facility,
      locationCode: "NEW-00-LOC",
      licenseValidity: "Pending",
      manager: "Unassigned",
      status: "review",
    };

    setSettings((previous) => ({
      ...previous,

      branches: [...previous.branches, newBranch],
    }));
  };

  // =========================
  // Save
  // =========================
  const handleSave = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  };

  // =========================
  // Version History
  // =========================
  const handleVersionHistory = () => {
    window.alert(`Current revision: ${settings.audit.revision}`);
  };

  return (
    <main className="w-full min-w-0 overflow-hidden bg-[#f9f9ff] p-4 md:p-6">
      <div className="w-full min-w-0 flex flex-col">
        {/* Header */}
        <SystemSettingsHeader
          environment={settings.environment}
          onSave={handleSave}
          onVersionHistory={handleVersionHistory}
        />

        {/* Tabs */}
        <SystemSettingsTabs
          tabs={settings.tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          branchCount={settings.branches.length}
        />

        {/* Content */}
        {activeTab === "company" && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left */}
            <div className="xl:col-span-8 min-w-0 flex flex-col gap-6">
              <CompanyProfile
                company={settings.company}
                onChange={handleCompanyChange}
              />

              <StatutoryLicensing
                licensing={settings.licensing}
                onChange={handleLicensingChange}
              />

              <OperatingBranches
                branches={settings.branches}
                onEdit={handleBranchEdit}
                onAdd={handleAddBranch}
              />
            </div>

            {/* Right */}
            <div className="xl:col-span-4 min-w-0 flex flex-col gap-6">
              <TaxGSTRates
                taxRates={settings.taxRates}
                onEdit={handleTaxEdit}
              />

              <FacilityDistribution
                distribution={settings.facilityDistribution}
                totalNodes={settings.branches.length}
              />

              <AuditTrailSignoff audit={settings.audit} />
            </div>
          </div>
        )}

        {/* Branches Tab */}
        {activeTab === "branches" && (
          <OperatingBranches
            branches={settings.branches}
            onEdit={handleBranchEdit}
            onAdd={handleAddBranch}
          />
        )}

        {/* Tax Tab */}
        {activeTab === "tax" && (
          <TaxGSTRates taxRates={settings.taxRates} onEdit={handleTaxEdit} />
        )}

        {activeTab === "currency" && (
          <CurrencyUnits
            settings={settings}
            onChange={(field, value) =>
              setSettings((previous) => ({
                ...previous,
                [field]: value,
              }))
            }
          />
        )}

        {activeTab === "integration" && (
          <IntegrationDefaults
            settings={settings}
            onChange={(id, value) =>
              setSettings((previous) => ({
                ...previous,
                integrations: previous.integrations.map((integration) =>
                  integration.id === id
                    ? {
                        ...integration,
                        enabled: value,
                      }
                    : integration,
                ),
              }))
            }
          />
        )}
      </div>

      {/* Save Toast */}
      <div
        className={`fixed bottom-6 right-6 bg-[#2c303a] text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 z-50 transition-all duration-300 ${
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <span className="text-[#9cf6bc]">✓</span>

        <span className="text-sm">
          System settings successfully committed to Production.
        </span>
      </div>
    </main>
  );
};

export default SystemSettings;
