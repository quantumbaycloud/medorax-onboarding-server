export const AUDIT_LOGS = [
  {
    id: 1,
    timestamp: "2024-10-25 14:48:12",
    relativeTime: "10s ago • 16:48:12 CEST",

    initials: "SJ",
    user: "Sarah Jenkins",
    email: "s.jenkins@medorax.eu",
    role: "Super Admin",
    avatarType: "primary",

    module: "Tax Settings",
    moduleIcon: "payments",

    action: "UPDATE_RATE",
    actionType: "primary",

    ip: "192.168.1.104",
    origin: "Chrome 129 / macOS 15.0",

    payload:
      "Tax rate for code HSN-3004 updated from 12.0% to 18.0%",
    diff: "[Diff: +6.00% VAT Base Rate]",
    diffType: "success",
  },

  {
    id: 2,
    timestamp: "2024-10-25 14:41:03",
    relativeTime: "7m ago • 16:41:03 CEST",

    initials: "MK",
    user: "Marcus Koenig",
    email: "m.koenig@medorax.eu",
    role: "Security Lead",
    avatarType: "tertiary",

    module: "Access & IAM",
    moduleIcon: "shield_person",

    action: "MFA_RESET",
    actionType: "danger-light",

    ip: "10.24.12.8",
    origin: "Firefox 131 / Linux x86_64",

    payload:
      "Hardware token de-registered for Dr. Arthur Vance (ID: USR-88219) via offline key-pair ticket",
    diff: "[Challenge Ticket: #SEC-98441 • Signature verified]",
    diffType: "danger",
  },

  {
    id: 3,
    timestamp: "2024-10-25 14:15:44",
    relativeTime: "33m ago • 16:15:44 CEST",

    initials: "SJ",
    user: "Sarah Jenkins",
    email: "s.jenkins@medorax.eu",
    role: "Super Admin",
    avatarType: "primary",

    module: "Permissions",
    moduleIcon: "manage_accounts",

    action: "ROLE_ELEVATE",
    actionType: "success-light",

    ip: "192.168.1.104",
    origin: "Chrome 129 / macOS 15.0",

    payload:
      "Elevated scope permissions for Elena Rostova to PHARMA_COMPLIANCE_OFFICER",
    diff: "[Scopes added: inventory:approve_narcotics, audit:read_all]",
    diffType: "normal",
  },

  {
    id: 4,
    timestamp: "2024-10-25 13:58:20",
    relativeTime: "50m ago • 15:58:20 CEST",

    initials: "SYS",
    user: "Daemon / Sentinel",
    email: "auto-sentinel@node-eu1",
    role: "Automated Daemon",
    avatarType: "system",

    module: "Security Engine",
    moduleIcon: "security",

    action: "SESSION_TERMINATE",
    actionType: "danger",

    ip: "185.220.101.5",
    origin: "TOR Exit Node / Unknown",
    originDanger: true,

    payload:
      "Forced termination of active bearer token for TOKEN-09a82 due to impossible travel velocity anomaly",
    diff:
      "[Anomaly: Paris (FR) to Frankfurt (DE) within 45 seconds • IP Flagged Geo-Threat]",
    diffType: "danger",
  },

  {
    id: 5,
    timestamp: "2024-10-25 13:22:19",
    relativeTime: "1h 26m ago",

    initials: "ER",
    user: "Elena Rostova",
    email: "e.rostova@medorax.eu",
    role: "Pharma Officer",
    avatarType: "primary",

    module: "Inventory & Cold Chain",
    moduleIcon: "inventory_2",

    action: "BATCH_QUARANTINE",
    actionType: "danger-light",

    ip: "192.168.4.52",
    origin: "Edge Tablet / Medorax OS",

    payload:
      "Cold-chain breach logged for Lot #BATCH-MED-88902 (Insulin Glargine 100U/mL). Total 4,200 vials isolated.",
    diff:
      "[Telemetry excursion: +8.4°C exceeded >45min threshold • Sensor SN-994]",
    diffType: "danger",
  },

  {
    id: 6,
    timestamp: "2024-10-25 12:45:00",
    relativeTime: "2h 03m ago",

    initials: "HL",
    user: "Hanna Lindqvist",
    email: "h.lindqvist@medorax.eu",
    role: "Finance Lead",
    avatarType: "tertiary",

    module: "Billing & Ledger",
    moduleIcon: "table_chart",

    action: "BULK_EXPORT",
    actionType: "neutral",

    ip: "192.168.1.88",
    origin: "Safari 18.0 / macOS 15.0",

    payload:
      "Exported General Ledger sub-account records for Q3 2024 [Total Records: 48,912]. Cryptographic hash stamped into export envelope.",
    diff: "[Checksum: e4c99b8214f76... • Format: PGP Encrypted CSV]",
    diffType: "normal",
  },

  {
    id: 7,
    timestamp: "2024-10-25 11:10:32",
    relativeTime: "3h 38m ago",

    initials: "SJ",
    user: "Sarah Jenkins",
    email: "s.jenkins@medorax.eu",
    role: "Super Admin",
    avatarType: "primary",

    module: "Verification",
    moduleIcon: "verified_user",

    action: "APPROVE_VENDOR",
    actionType: "success-light",

    ip: "192.168.1.104",
    origin: "Chrome 129 / macOS 15.0",

    payload:
      "Verified compliance dossier for Nordic Biopharma Ltd. GDP Certificate verified against EudraGMDP repository.",
    diff:
      "[EudraGMDP Ref: DE_BY_01_GDP_2024_0049 • State: CERTIFIED]",
    diffType: "success",
  },

  {
    id: 8,
    timestamp: "2024-10-25 09:30:11",
    relativeTime: "5h 18m ago",

    initials: "KMS",
    user: "KMS AutoKey Worker",
    email: "kms-worker@vault.internal",
    role: "Automated KMS",
    avatarType: "system",

    module: "Cryptographic Core",
    moduleIcon: "key",

    action: "ROTATE_KEK",
    actionType: "primary",

    ip: "127.0.0.1",
    origin: "HSM Cluster / FIPS 140-3 L4",

    payload:
      "90-day automatic rotation executed for Database Field Encryption Key (KEK-PRIMARY-04). Previous key marked retired.",
    diff:
      "[Old Key: 0x9188a... • New Active Key ID: 0x1174c... • Status: SUCCESS]",
    diffType: "normal",
  },

  {
    id: 9,
    timestamp: "2024-10-25 08:14:02",
    relativeTime: "6h 34m ago",

    initials: "MK",
    user: "Marcus Koenig",
    email: "m.koenig@medorax.eu",
    role: "Security Lead",
    avatarType: "tertiary",

    module: "System Settings",
    moduleIcon: "settings",

    action: "CONFIG_UPDATE",
    actionType: "primary",

    ip: "10.24.12.8",
    origin: "Firefox 131 / Linux x86_64",

    payload:
      "Updated timeout thresholds for API Gateway proxy routes to external EDI providers from 3000ms to 5000ms",
    diff: "[Param: cluster.ingress.edi_proxy_timeout_ms = 5000]",
    diffType: "normal",
  },

  {
    id: 10,
    timestamp: "2024-10-25 07:59:40",
    relativeTime: "6h 49m ago",

    initials: "SJ",
    user: "Sarah Jenkins",
    email: "s.jenkins@medorax.eu",
    role: "Super Admin",
    avatarType: "primary",

    module: "Session Core",
    moduleIcon: "login",

    action: "AUTH_SUCCESS",
    actionType: "success-light",

    ip: "192.168.1.104",
    origin: "Chrome 129 / macOS 15.0",

    payload:
      "Successful authentication via FIDO2 WebAuthn Passkey (YubiKey 5C NFC). Session token issued.",
    diff: "[MFA: FIDO2-PASSKEY • Session ID: SESS-eu1-9941a8]",
    diffType: "success",
  },

  {
    id: 11,
    timestamp: "2024-10-25 04:00:15",
    relativeTime: "10h 48m ago",

    initials: "CI",
    user: "Deploy Pipeline CI/CD",
    email: "runner-04@gitlab.internal",
    role: "System Pipeline",
    avatarType: "system",

    module: "Data Management",
    moduleIcon: "storage",

    action: "DB_MIGRATE",
    actionType: "primary",

    ip: "10.0.8.21",
    origin: "K8s Deployment Pod / Alpine",

    payload:
      "PostgreSQL schema upgrade applied: v4.88.2_add_serial_gtin_tracking. 0 row locks encountered.",
    diff:
      "[Migration completed in 1.48s • Replication Lag: 0ms]",
    diffType: "success",
  },

  {
    id: 12,
    timestamp: "2024-10-25 01:00:00",
    relativeTime: "13h 48m ago",

    initials: "ARC",
    user: "Cold Archiver Worker",
    email: "glacier-sink@worker-de.internal",
    role: "Archive Daemon",
    avatarType: "system",

    module: "Audit & Archival",
    moduleIcon: "archive",

    action: "SEAL_ARCHIVE",
    actionType: "neutral",

    ip: "10.0.1.19",
    origin: "Internal VPC / Private Subnet",

    payload:
      "Telemetry block BLOCK-2017-Q3 sealed and mirrored to immutable WORM storage repository (EU-Central-1).",
    diff:
      "[WORM Object ARN: arn:aws:s3:::medorax-worm-audit/block-2017-q3.tar.gz.enc]",
    diffType: "normal",
  },
    {
    id: 13,
    timestamp: "2024-10-25 01:00:00",
    relativeTime: "13h 48m ago",

    initials: "ARC",
    user: "Cold Archiver Worker",
    email: "glacier-sink@worker-de.internal",
    role: "Archive Daemon",
    avatarType: "system",

    module: "Audit & Archival",
    moduleIcon: "archive",

    action: "SEAL_ARCHIVE",
    actionType: "neutral",

    ip: "10.0.1.19",
    origin: "Internal VPC / Private Subnet",

    payload:
      "Telemetry block BLOCK-2017-Q3 sealed and mirrored to immutable WORM storage repository (EU-Central-1).",
    diff:
      "[WORM Object ARN: arn:aws:s3:::medorax-worm-audit/block-2017-q3.tar.gz.enc]",
    diffType: "normal",
  },
];

export const AUDIT_MODULES = [
  "All Modules",
  "Tax Settings",
  "Access & IAM",
  "Permissions",
  "Security Engine",
  "Inventory & Cold Chain",
  "Billing & Ledger",
  "Verification",
  "Cryptographic Core",
  "System Settings",
  "Session Core",
  "Data Management",
  "Audit & Archival",
];

export const AUDIT_ACTIONS = [
  "All Actions",
  "UPDATE_RATE",
  "MFA_RESET",
  "ROLE_ELEVATE",
  "SESSION_TERMINATE",
  "BATCH_QUARANTINE",
  "BULK_EXPORT",
  "APPROVE_VENDOR",
  "ROTATE_KEK",
  "CONFIG_UPDATE",
  "AUTH_SUCCESS",
  "DB_MIGRATE",
  "SEAL_ARCHIVE",
];