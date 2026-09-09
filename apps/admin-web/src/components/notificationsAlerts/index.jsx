import { useEffect, useState } from "react";

import { NOTIFICATIONS_ALERTS } from "../../constants/notificationsAlerts";

import NotificationsHeader from "./NotificationsHeader";
import NotificationsStats from "./NotificationsStats";
import ThresholdAlerts from "./ThresholdAlerts";
import DispatchChannels from "./DispatchChannels";
import EscalationSlaRules from "./EscalationSLARules";
import NotificationsBottomBar from "./NotificationsBottomBar";
import NotificationsToast from "./NotificationsToast";

const createThresholdValues = (rules = []) => {
  return rules.reduce((result, rule) => {
    result[rule.id] = rule.value;
    return result;
  }, {});
};

const createEscalationValues = (rules = []) => {
  return rules.reduce((result, rule) => {
    if (rule.type !== "toggle") {
      result[rule.id] = rule.value;
    }

    return result;
  }, {});
};

const createEscalationToggles = (rules = []) => {
  return rules.reduce((result, rule) => {
    if (rule.type === "toggle") {
      result[rule.id] = Boolean(rule.enabled);
    }

    return result;
  }, {});
};

const NotificationsAlerts = () => {
  const [thresholdValues, setThresholdValues] = useState(() =>
    createThresholdValues(NOTIFICATIONS_ALERTS.thresholdSection.rules),
  );

  const [channels, setChannels] = useState(
    NOTIFICATIONS_ALERTS.dispatch.channels,
  );

  const [escalationValues, setEscalationValues] = useState(() =>
    createEscalationValues(NOTIFICATIONS_ALERTS.escalation.rules),
  );

  const [escalationToggles, setEscalationToggles] = useState(() =>
    createEscalationToggles(NOTIFICATIONS_ALERTS.escalation.rules),
  );

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (!toast.visible) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast((previous) => ({
        ...previous,
        visible: false,
      }));
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [toast.visible]);

  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const handleThresholdChange = (ruleId, value) => {
    setThresholdValues((previous) => ({
      ...previous,
      [ruleId]: value,
    }));
  };

  const handleChannelToggle = (channelId, enabled) => {
    setChannels((previous) =>
      previous.map((channel) =>
        channel.id === channelId && !channel.locked
          ? {
              ...channel,
              enabled,
            }
          : channel,
      ),
    );
  };

  const handleChannelFieldChange = (channelId, field, value) => {
    setChannels((previous) =>
      previous.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              [field]: value,
            }
          : channel,
      ),
    );
  };

  const handleEscalationValueChange = (ruleId, value) => {
    setEscalationValues((previous) => ({
      ...previous,
      [ruleId]: value,
    }));
  };

  const handleEscalationToggle = (ruleId, enabled) => {
    setEscalationToggles((previous) => ({
      ...previous,
      [ruleId]: enabled,
    }));
  };

  const handleSave = () => {
    showToast(NOTIFICATIONS_ALERTS.toast.saveMessage);
  };

  const handleTest = () => {
    showToast(NOTIFICATIONS_ALERTS.toast.testMessage, "info");
  };

  const enabledThresholds = NOTIFICATIONS_ALERTS.thresholdSection.rules.filter(
    (rule) => {
      const value = thresholdValues[rule.id];

      if (rule.type === "select") {
        return Boolean(value);
      }

      return Number.isFinite(Number(value));
    },
  ).length;

  return (
    <main className="w-full min-w-0 overflow-hidden bg-[#f9f9ff] p-4 md:p-6">
      <div className="w-full min-w-0 flex flex-col">
        <NotificationsHeader
          header={NOTIFICATIONS_ALERTS.header}
          onSave={handleSave}
        />

        <NotificationsStats stats={NOTIFICATIONS_ALERTS.stats} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <ThresholdAlerts
            section={NOTIFICATIONS_ALERTS.thresholdSection}
            values={thresholdValues}
            onValueChange={handleThresholdChange}
            enabledCount={enabledThresholds}
          />

          <div className="xl:col-span-5 flex flex-col gap-6">
            <DispatchChannels
              dispatch={NOTIFICATIONS_ALERTS.dispatch}
              channels={channels}
              onToggle={handleChannelToggle}
              onFieldChange={handleChannelFieldChange}
            />

            <EscalationSlaRules
              escalation={NOTIFICATIONS_ALERTS.escalation}
              values={escalationValues}
              enabledValues={escalationToggles}
              onValueChange={handleEscalationValueChange}
              onToggle={handleEscalationToggle}
            />
          </div>
        </div>

        <NotificationsBottomBar
          config={NOTIFICATIONS_ALERTS.bottomBar}
          onTest={handleTest}
          onSave={handleSave}
        />
      </div>

      <NotificationsToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </main>
  );
};

export default NotificationsAlerts;
