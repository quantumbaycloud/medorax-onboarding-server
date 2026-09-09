export const NOTIFICATIONS_ALERTS = {
  header: {
    breadcrumb: ["Admin Console", "Notifications & Alerts Config"],
    title: "Notifications & Alerts Config",
    description:
      "Configure enterprise operational thresholds, SLA triggers, and multichannel alert dispatches across clinical and supply telemetry nodes.",

    telemetry: {
      label: "Telemetry Stream",
      status: "Active",
      active: true,
    },

    saveLabel: "Save Notification Rules",
  },

  stats: [
    {
      id: "active-triggers",
      label: "Active Triggers",
      value: "18 / 20",
      icon: "sensors",
      tone: "primary",
    },
    {
      id: "sms-gateway",
      label: "SMS Gateway Relay",
      value: "99.98%",
      icon: "cellTower",
      tone: "secondary",
    },
    {
      id: "cold-chain",
      label: "Cold Chain Monitor",
      value: "±2.0°C",
      icon: "coldChain",
      tone: "neutral",
    },
    {
      id: "sla-queue",
      label: "SLA Escalation Queue",
      value: "3 Pending",
      icon: "hourglass",
      tone: "muted",
    },
  ],

  thresholdSection: {
    title: "Inventory & Clinical Threshold Alerts",
    description:
      "Set automated stock depletion triggers, critical shelf-life metrics, and cryogenic sensory boundaries.",
    enabledLabel: "Rules Enabled",

    rules: [
      {
        id: "low-stock",
        title: "Low Stock Threshold",
        description:
          "Triggers automated procurement re-order warnings when on-hand stock breaches min allocation.",
        info:
          "Configures automated replenishment warnings for inventory nodes.",
        value: 50,
        min: 1,
        max: 10000,
        step: 1,
        suffix: "units / SKU",
        tone: "primary",
      },

      {
        id: "near-expiry",
        title: "Near Expiry Warning Window",
        description:
          "Notifies pharmacy ops team ahead of lot expiration to prioritize FEFO dispensing.",
        badge: "Batch Level",
        value: 30,
        min: 5,
        max: 180,
        step: 1,
        suffix: "days before expiry",
        tone: "primary",
      },

      {
        id: "critical-expiry",
        title: "Critical Expiry Lockdown Alert",
        description:
          "Immediate high-urgency ping before automatic digital isolation of impacted vials/batches.",
        badge: "Auto-Quarantine",
        badgeTone: "danger",
        value: 7,
        min: 1,
        max: 30,
        step: 1,
        suffix: "days",
        tone: "danger",
      },

      {
        id: "overstock",
        title: "Overstock Ceiling Threshold",
        description:
          "Prevents capital lock-up and warehouse refrigeration congestion against run-rate averages.",
        value: 150,
        min: 100,
        max: 500,
        step: 5,
        suffix: "% monthly avg",
        tone: "primary",
      },

      {
        id: "thermal-deviation",
        title: "Cold Chain Thermal Deviation Sensitivity",
        description:
          "Instant dispatch trigger for temperature spikes outside validated cold transport boundaries.",
        badge: "IoT Telemetry",
        badgeTone: "success",
        type: "select",
        value: "±2.0 °C cold chain tolerance",
        options: [
          "±2.0 °C cold chain tolerance",
          "±1.0 °C high sensitivity (Biologicals)",
          "±0.5 °C cryogenic / ultra-low",
          "±3.0 °C ambient controlled",
        ],
        tone: "primary",
      },
    ],
  },

  preview: {
    title: "Simulated Breach Rate",
    description:
      "Estimated ~3.2 alert events/day with current calibrated limits.",
    value: 3.2,
    unit: "alert events/day",
    points: [
      [2, 20],
      [25, 20],
      [40, 8],
      [55, 24],
      [75, 14],
      [95, 18],
      [118, 4],
    ],
  },

  dispatch: {
    title: "Dispatch Channels & Delivery",
    description:
      "Manage destination protocols and failover conduits.",

    channels: [
      {
        id: "in-app",
        name: "System & In-App Feed",
        description:
          "Real-time notification tray across web & handheld ERP terminal",
        icon: "notifications",
        mandatory: true,
        enabled: true,
        locked: true,
      },

      {
        id: "email",
        name: "Email Dispatch",
        description:
          "Formatted summaries and alert attachments",
        icon: "email",
        enabled: true,
        recipient: "ops-alerts@medorax.com",
        recipientLabel: "Recipient",
      },

      {
        id: "sms",
        name: "SMS Critical Alerts",
        description:
          "High priority paging for on-call duty managers",
        icon: "sms",
        enabled: true,
        gateway: "Twilio Enterprise SMS",
        gatewayLabel: "Gateway",
        gatewayOptions: [
          "Twilio Enterprise SMS",
          "AWS SNS Enterprise",
          "Sinck Global Gateway",
        ],
        priority: "Critical Only",
        priorityLabel: "Priority Filter",
        priorityTone: "danger",
      },

      {
        id: "webhook",
        name: "Webhook / PagerDuty Dispatch",
        description:
          "Automated operational incidents relay",
        icon: "webhook",
        enabled: false,
        inactiveLabel: "Inactive",
        endpointDescription:
          "Requires endpoint URL & HMAC signing key",
        configureLabel: "Configure Endpoint",
      },
    ],
  },

  escalation: {
    title: "Escalation & SLA Rules",
    description:
      "Define threshold breaches and compliance digest intervals.",

    rules: [
      {
        id: "po-approval",
        title: "Pending PO Approval Escalation",
        description:
          "Automatically alert Senior Procurement Director before SLA breach",
        type: "select",
        value: "48 hours before SLA breach",
        options: [
          "48 hours before SLA breach",
          "24 hours before SLA breach",
          "12 hours before SLA breach",
          "4 hours before SLA breach",
        ],
      },

      {
        id: "security",
        title: "Security Incident Immediate Alert",
        description:
          "Dispatches across all channels upon audit failure or unauthorized access attempts",
        badge: "Zero Latency",
        badgeTone: "danger",
        type: "toggle",
        enabled: true,
      },

      {
        id: "digest",
        title: "Summary Digest Cadence",
        description:
          "Consolidated non-critical telemetry delivered to executive inbox",
        type: "select",
        value: "Daily Morning Digest (08:00 AM)",
        options: [
          "Daily Morning Digest (08:00 AM)",
          "Twice Daily (08:00 AM / 04:00 PM)",
          "Weekly Consolidated (Monday 07:00 AM)",
        ],
      },
    ],
  },

  bottomBar: {
    syncStatus: "Configuration schema synchronized",
    node: "Cluster node #EU-PROD-01",
    lastRevised: "42 mins ago",

    testLabel: "Test Notification Dispatch",
    saveLabel: "Save Alert Preferences",
  },

  toast: {
    saveMessage:
      "Alert configurations saved and applied across all clusters.",

    testMessage:
      "Dispatched test alerts to ops-alerts@medorax.com & Twilio SMS node.",
  },
};