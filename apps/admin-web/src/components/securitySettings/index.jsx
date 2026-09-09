import { useState } from "react";

import { SECURITY_SETTINGS } from "../../constants/securitySettings";

import SecuritySettingsHeader from "./SecuritySettingsHeader";
import SecurityStats from "./SecurityStats";
import SessionAuthGovernance from "./SessionAuthGovernance";
import MfaSettings from "./MfaSettings";
import IpWhitelisting from "./IpWhitelisting";
import PasswordPolicy from "./PasswordPolicy";
import SecuritySignalBanner from "./SecuritySignalBanner";
import SecuritySettingsFooter from "./SecuritySettingsFooter";
import SecurityToast from "./SecurityToast";

const SecuritySettings = () => {
  const data = SECURITY_SETTINGS;

  const createInitialState = () => ({
    sessionTimeout: data.session.sessionTimeout.value,

    concurrentSessions:
      data.session.concurrentSessions.value,

    forceLogout: data.session.forceLogout.enabled,

    enforcement: data.mfa.enforcement.value,

    methods: data.mfa.methods.items.reduce(
      (result, method) => {
        result[method.id] = method.enabled;
        return result;
      },
      {}
    ),

    cidrs: data.network.cidr.items.map((item) => ({
      ...item,
    })),

    geofencing:
      data.network.geofencing.enabled,

    cidrInput: "",

    minimumLength:
      data.password.minimumLength.value,

    expiration:
      data.password.expiration.value,

    complexity:
      data.password.complexity.rules.reduce(
        (result, rule) => {
          result[rule.id] = rule.enabled;
          return result;
        },
        {}
      ),
  });

  const [settings, setSettings] = useState(
    createInitialState
  );

  const [toastVisible, setToastVisible] =
    useState(false);

  const showToast = () => {
    setToastVisible(true);

    window.setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  };

  const handleSave = () => {
    showToast();
  };

  const handleReset = () => {
    const shouldReset = window.confirm(
      data.resetConfirmation
    );

    if (!shouldReset) return;

    setSettings(createInitialState());
    showToast();
  };

  const handleSessionChange = (
    field,
    value
  ) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleMfaMethodChange = (methodId) => {
    setSettings((previous) => ({
      ...previous,
      methods: {
        ...previous.methods,
        [methodId]:
          !previous.methods[methodId],
      },
    }));
  };

  const handleComplexityChange = (ruleId) => {
    setSettings((previous) => ({
      ...previous,
      complexity: {
        ...previous.complexity,
        [ruleId]:
          !previous.complexity[ruleId],
      },
    }));
  };

  const handlePasswordChange = (
    field,
    value
  ) => {
    if (field === "complexity") {
      handleComplexityChange(value);
      return;
    }

    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleAddCidr = (event) => {
    event.preventDefault();

    const value = settings.cidrInput.trim();

    if (!value) return;

    const alreadyExists =
      settings.cidrs.some(
        (item) =>
          item.value.toLowerCase() ===
          value.toLowerCase()
      );

    if (alreadyExists) {
      setSettings((previous) => ({
        ...previous,
        cidrInput: "",
      }));
      return;
    }

    const newCidr = {
      id: `cidr-${Date.now()}`,
      value,
      description: "Custom Network",
    };

    setSettings((previous) => ({
      ...previous,
      cidrs: [
        ...previous.cidrs,
        newCidr,
      ],
      cidrInput: "",
    }));
  };

  const handleRemoveCidr = (id) => {
    setSettings((previous) => ({
      ...previous,
      cidrs: previous.cidrs.filter(
        (item) => item.id !== id
      ),
    }));
  };

  const handleBackupCodes = () => {
    showToast();
  };

  const handleTestPassword = () => {
    showToast();
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F9FF] text-[#171C24]">
      <main className="w-full p-6">
        <div className="flex w-full flex-col space-y-6">
          <SecuritySettingsHeader
            data={data}
            onSave={handleSave}
          />

          <SecurityStats stats={data.stats} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SessionAuthGovernance
              data={data.session}
              values={{
                sessionTimeout:
                  settings.sessionTimeout,
                concurrentSessions:
                  settings.concurrentSessions,
                forceLogout:
                  settings.forceLogout,
              }}
              onChange={handleSessionChange}
            />

            <MfaSettings
              data={data.mfa}
              values={{
                enforcement:
                  settings.enforcement,
                methods:
                  settings.methods,
              }}
              onEnforcementChange={(value) =>
                setSettings((previous) => ({
                  ...previous,
                  enforcement: value,
                }))
              }
              onMethodChange={
                handleMfaMethodChange
              }
              onBackupCodes={
                handleBackupCodes
              }
            />

            <IpWhitelisting
              data={data.network}
              cidrs={settings.cidrs}
              inputValue={settings.cidrInput}
              onInputChange={(value) =>
                setSettings((previous) => ({
                  ...previous,
                  cidrInput: value,
                }))
              }
              onAddCidr={handleAddCidr}
              onRemoveCidr={handleRemoveCidr}
              geofencingEnabled={
                settings.geofencing
              }
              onToggleGeofencing={() =>
                setSettings((previous) => ({
                  ...previous,
                  geofencing:
                    !previous.geofencing,
                }))
              }
            />

            <PasswordPolicy
              data={data.password}
              values={{
                minimumLength:
                  settings.minimumLength,
                expiration:
                  settings.expiration,
                complexity:
                  settings.complexity,
              }}
              onChange={
                handlePasswordChange
              }
              onTest={
                handleTestPassword
              }
            />
          </div>

          <SecuritySignalBanner
            data={data.securitySignal}
          />

          <SecuritySettingsFooter
            data={data.footer}
            onReset={handleReset}
            onSave={handleSave}
          />
        </div>
      </main>

      <SecurityToast
        visible={toastVisible}
        data={data.toast}
      />
    </div>
  );
};

export default SecuritySettings;