export const SECURITY_SETTINGS = {
  page: {
    breadcrumb: ["Admin Console", "Security Settings"],
    title: "Security Settings",
    status: "Policy Active",
    description:
      "Configure global identity policies, multi-factor authentication, session timeouts, and network boundary controls.",
    primaryColor: "#235EAC",
  },

  headerActions: {
    history: {
      label: "Version History",
      icon: "history",
    },
    save: {
      label: "Save Security Policy",
      icon: "verified",
    },
  },

  stats: [
    {
      id: "compliance",
      label: "Compliance Posture",
      value: "SOC2 & HIPAA",
      supportingText: "Valid until March 2026",
      icon: "shield",
      iconBackground: "bg-[#9CF6BC]/40",
      iconColor: "text-[#006D40]",
      supportingColor: "text-[#006D40]",
    },
    {
      id: "mfa",
      label: "MFA Coverage",
      value: "99.4%",
      suffix: "/ 1,420 users",
      supportingText: "8 exemptions pending review",
      icon: "security",
      iconBackground: "bg-[#D6E3FF]",
      iconColor: "text-[#235EAC]",
      supportingColor: "text-[#424751]",
    },
    {
      id: "threats",
      label: "Threat Ingress Blocked",
      value: "2,841",
      suffix: "+14% vs avg",
      supportingText: "Last 24 hours (Automated)",
      icon: "download",
      iconBackground: "bg-[#E5E8F4]",
      iconColor: "text-[#235EAC]",
      supportingColor: "text-[#006D40]",
    },
  ],

  session: {
    title: "Session & Authentication Governance",
    description:
      "Manage token lifespans and concurrent user sessions.",
    icon: "timer",

    sessionTimeout: {
      label: "Session Inactivity Timeout",
      value: "30",
      options: [
        { value: "15", label: "15 Minutes" },
        { value: "30", label: "30 Minutes (Recommended)" },
        { value: "60", label: "60 Minutes" },
        { value: "120", label: "120 Minutes" },
      ],
      description:
        "Automatically invalidates JWT authentication bearer tokens after idle period.",
    },

    concurrentSessions: {
      label: "Concurrent Session Limit",
      value: "2 devices per user",
      icon: "devices",
      description:
        "Excess sign-ins will disconnect the oldest active session.",
    },

    forceLogout: {
      label: "Force Logout on Password Change",
      description:
        "Instantly revokes all active desktop and mobile sessions across connected branches.",
      enabled: true,
    },

    footer: {
      breadcrumb: ["Admin Console", "Security Settings"],
    },
  },

  mfa: {
    title: "Multi-Factor Authentication (MFA)",
    description:
      "Define two-step verification constraints across org units.",
    icon: "fingerprint",
    badge: {
      label: "Strict",
      icon: "verified",
    },

    enforcement: {
      label: "Enforcement Policy",
      value: "all",
      options: [
        {
          value: "all",
          label: "Enforce for All Corporate & Pharmacy Staff",
          verified: true,
        },
        {
          value: "admins",
          label: "Enforce for Super Admins & Managers Only",
          verified: false,
        },
        {
          value: "optional",
          label: "Optional (User self-enrollment)",
          verified: false,
        },
      ],
    },

    methods: {
      label: "Permitted MFA Methods",
      items: [
        {
          id: "totp",
          label: "Authenticator App (TOTP)",
          description:
            "Google Authenticator, Microsoft Auth, 1Password",
          enabled: true,
          badge: "Recommended",
          badgeColor: "text-[#006D40]",
        },
        {
          id: "webauthn",
          label: "Hardware Security Keys (WebAuthn / FIDO2)",
          description:
            "Yubikey, Apple TouchID, Windows Hello",
          enabled: true,
          badge: "Phishing-Resistant",
          badgeColor: "text-[#235EAC]",
        },
        {
          id: "sms",
          label: "SMS Passcode",
          description:
            "Delivery through cellular SMS verification gateways",
          enabled: false,
          warning: "SIM-Swap Vulnerable",
          warningIcon: "warning",
        },
      ],
    },

    gracePeriod: {
      label: "Grace period for new staff",
      value: "72 Hours",
    },

    backupCodesAction: {
      label: "Configure Backup Codes",
    },
  },

  network: {
    title: "IP Whitelisting & Network Boundaries",
    description:
      "Restrict administrative access exclusively to approved corporate VPN and pharmacy network IPs.",
    icon: "lan",

    cidr: {
      label: "Authorized CIDR Subnets",
      placeholder:
        "e.g. 198.51.100.0/24 (Regional Distribution)",
      items: [
        {
          id: 1,
          value: "192.168.1.0/24",
          description: "Corporate HQ",
        },
        {
          id: 2,
          value: "10.24.0.0/16",
          description: "Pharmacy VPN Gateway",
        },
        {
          id: 3,
          value: "172.16.8.44",
          description: "Emergency Failover",
        },
      ],
    },

    geofencing: {
      label: "Strict Geofencing",
      status: "Active",
      description:
        "Block access attempts from non-licensed countries and flagged autonomous system numbers (ASNs).",
      enabled: true,
    },

    inboundRequest: {
      label: "Current Inbound Request IP",
      value: "62.19.144.12",
      status: "Matches Range",
    },

    addCidr: {
      label: "Add IP CIDR",
      icon: "add",
    },
  },

  password: {
    title: "Password Policy & Encryption Standards",
    description:
      "Enforce credential complexity, key rotation cycles, and hashing algorithms.",
    icon: "password",

    minimumLength: {
      label: "Minimum Password Length",
      value: 12,
      min: 8,
      max: 64,
      unit: "chars",
      description: "Recommended: 12+ characters",
    },

    expiration: {
      label: "Password Expiration Interval",
      value: "90",
      options: [
        { value: "30", label: "30 Days" },
        { value: "60", label: "60 Days" },
        { value: "90", label: "90 Days" },
        { value: "180", label: "180 Days" },
        {
          value: "never",
          label: "Never Expire (NIST recommended)",
        },
      ],
      description: "Enforces mandatory credential rotation",
    },

    complexity: {
      label: "Required Complexity Rules",
      rules: [
        {
          id: "uppercase",
          label: "Uppercase Letters (A-Z)",
          enabled: true,
        },
        {
          id: "lowercase",
          label: "Lowercase Letters (a-z)",
          enabled: true,
        },
        {
          id: "numeric",
          label: "Numeric Characters (0-9)",
          enabled: true,
        },
        {
          id: "special",
          label: "Special Symbols (!@#$%)",
          enabled: true,
        },
      ],
    },

    encryption: {
      label: "At-Rest & Transit Encryption",
      value: "AES-256-GCM / TLS 1.3",
      icon: "encryption",
    },

    bcrypt: {
      label: "Bcrypt Cost Factor",
      value: "12 rounds",
    },

    testPasswordAction: {
      label: "Test Password Rigidity",
    },
  },

  securitySignal: {
    icon: "policy",
    title: "Automated Intrusion Countermeasures Active",
    badge: "Live Monitoring",
    description:
      "Rate limits trigger temporary IP suspensions after 5 failed authentication attempts within 60 seconds.",
    certification: "SOC-2 Type II Certified",
    certificationIcon: "verified",
  },

  footer: {
    auditIcon: "historyEdu",
    auditLabel: "Policy Audit Stamp:",
    auditText:
      "Last policy revision signed by",
    auditor: "Super Admin (Sarah Jenkins)",
    auditDate: "Oct 24, 2024, 14:18 UTC",

    resetLabel: "Reset to Defaults",
    saveLabel: "Save Security Settings",
    saveIcon: "lockReset",
  },

  toast: {
    title: "Security Settings Updated",
    message:
      "New policies deployed across European nodes in real-time.",
    icon: "check",
  },

  resetConfirmation:
    "Are you sure you want to revert all security configurations back to system baseline defaults?",
};