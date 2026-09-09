export const DATA_MANAGEMENT = {
  page: {
    breadcrumb: ["Admin Console", "Data Management"],
    title: "Data Management",
    description:
      "Manage enterprise database snapshots, automated backups, and bulk data import/export pipelines.",
  },

  headerActions: {
    auditTrail: {
      label: "Audit Trail",
      icon: "history",
    },
    manualBackup: {
      label: "Trigger Manual Backup",
      icon: "backup",
    },
  },

  telemetry: [
    {
      id: "pitr",
      label: "PITR Status",
      value: "Continuous (0s lag)",
      icon: "verified",
      tone: "success",
    },
    {
      id: "storage",
      label: "Storage Utilized",
      value: "148.6 GB / 500 GB",
      icon: "database",
      tone: "primary",
    },
    {
      id: "encryption",
      label: "Encryption Standard",
      value: "AES-256-GCM",
      icon: "security",
      tone: "primary",
    },
    {
      id: "replica",
      label: "Replica Health",
      value: "Sync 3/3 Regional",
      icon: "cloud_sync",
      tone: "success",
    },
  ],

  backup: {
    title: "Automated Backup & Disaster Recovery",
    icon: "cloud_done",

    health: {
      icon: "check_circle",
      text: "Automated Backups Healthy (Point-in-Time Recovery Active)",
    },

    backupButton: {
      label: "Backup Now",
      icon: "play_arrow",
    },

    metrics: [
      {
        id: "lastSnapshot",
        label: "Last Snapshot",
        value: "14 minutes ago",
        secondary: "Oct 25, 2024, 14:32 UTC",
        icon: "schedule",
      },
      {
        id: "snapshotSize",
        label: "Snapshot Size",
        value: "3.42 GB",
        secondary: "AES-256 Encrypted",
        icon: "hard_drive",
      },
      {
        id: "retention",
        label: "Retention Policy",
        value: "30 Days Daily",
        secondary: "12 Months Monthly Tier",
        icon: "event_repeat",
      },
    ],

    timeline: {
      title: "Snapshot Frequency Timeline",
      nextScheduled: "Next Scheduled: 15:00 UTC (28m)",

      items: [
        {
          id: 1,
          time: "14:00",
          status: "Done",
          type: "done",
        },
        {
          id: 2,
          time: "14:15",
          status: "Done",
          type: "done",
        },
        {
          id: 3,
          time: "14:30",
          status: "Done",
          type: "done",
        },
        {
          id: 4,
          time: "14:32",
          status: "Hot Standby",
          type: "active",
        },
        {
          id: 5,
          time: "14:45",
          status: "Pending",
          type: "pending",
        },
        {
          id: 6,
          time: "15:00",
          status: "Scheduled",
          type: "scheduled",
        },
      ],
    },

    archives: {
      title: "Recent Snapshot Archives",
      showingText: "Showing latest 4 snapshots",

      columns: [
        "Timestamp",
        "Type",
        "Status",
        "Integrity Hash",
        "Actions",
      ],

      rows: [
        {
          id: "snap-1",
          timestamp: "Oct 25, 2024 • 14:32 UTC",
          size: "3.42 GB",
          type: "Automated",
          typeIcon: "autorenew",
          status: "Complete",
          statusTone: "success",
          hash: "sha256:8f2a…d910",
        },
        {
          id: "snap-2",
          timestamp: "Oct 25, 2024 • 12:00 UTC",
          size: "3.41 GB",
          type: "Automated",
          typeIcon: "autorenew",
          status: "Complete",
          statusTone: "success",
          hash: "sha256:3c14…9a2e",
        },
        {
          id: "snap-3",
          timestamp: "Oct 25, 2024 • 09:15 UTC",
          size: "3.39 GB",
          type: "Manual (S. Jenkins)",
          typeIcon: "fingerprint",
          status: "Complete",
          statusTone: "success",
          hash: "sha256:e76b…8112",
          manual: true,
        },
        {
          id: "snap-4",
          timestamp: "Oct 25, 2024 • 06:00 UTC",
          size: "3.38 GB",
          type: "Automated",
          typeIcon: "autorenew",
          status: "Complete",
          statusTone: "success",
          hash: "sha256:0d55…e67c",
        },
      ],

      footer: {
        icon: "cloud_queue",
        text: "Replicated to Cold Glacier S3 Bucket in eu-central-1",
        action: "View All Snapshots (142)",
      },
    },
  },

  migration: {
    title: "Bulk Data Import & Migration",
    subtitle: "Upload catalog sheets and inventory matrices",
    icon: "upload_file",

    templates: {
      label: "CSV Templates",
      icon: "file_download",
    },

    schema: {
      label: "Destination Entity / Schema Module",

      options: [
        {
          id: "catalog",
          label: "Medicine Catalog",
          icon: "medication",
        },
        {
          id: "stock",
          label: "Opening Stock / Batches",
          icon: "inventory_2",
        },
        {
          id: "suppliers",
          label: "Suppliers Directory",
          icon: "local_shipping",
        },
        {
          id: "staff",
          label: "Staff Accounts",
          icon: "badge",
        },
      ],
    },

    upload: {
      acceptedTypes: [".csv", ".xlsx", ".json"],
      title:
        "Click to browse or drag and drop pharmaceutical CSV, Excel (.xlsx), or JSON files here",
      description:
        "System verifies NDC identifiers, dosage codes, and batch expiration logic",
      restriction: "Max 50MB per batch • UTF-8 Encoded",
      icon: "cloud_upload",
      restrictionIcon: "lock",
      maxSizeMB: 50,
    },

    validation: {
      label: "Pre-validation Dry Run",
      icon: "rule",
      defaultEnabled: true,
    },

    ingestion: {
      label: "Initiate Module Ingestion",
      icon: "publish",
    },

    jobs: {
      title: "Recent Ingestion Pipeline Jobs",
      statusLabel: "Live Queue",

      columns: [
        "Job ID",
        "Module & Volume",
        "Status",
        "Initiator",
        "Artifacts",
      ],

      rows: [
        {
          id: "IMP-8821",
          prefix: "#IMP-8821",
          module: "Medicine Catalog",
          volume: "12,400 rows processed",
          status: "Completed w/ 2 Warnings",
          statusTone: "warning",
          initiator: "S. Jenkins",
          artifact: "Download Error Log",
          artifactIcon: "warning",
          artifactTone: "error",
        },
        {
          id: "IMP-8820",
          prefix: "#IMP-8820",
          module: "Suppliers Directory",
          volume: "420 rows processed",
          status: "Success (100%)",
          statusTone: "success",
          initiator: "API Connector",
          artifact: "Summary Log",
          artifactIcon: "receipt",
          artifactTone: "primary",
        },
        {
          id: "EXP-8819",
          prefix: "#EXP-8819",
          module: "Regulatory Audit Export",
          volume: "88,140 rows exported",
          status: "Ready for Download",
          statusTone: "success",
          initiator: "System (Cron)",
          artifact: "Export .zip",
          artifactIcon: "download",
          artifactTone: "primary",
        },
      ],
    },
  },

  diagnostics: {
    title: "PostgreSQL WAL Streaming & Secondary Replicas",
    descriptionPrefix: "Replica cluster",
    cluster: "pg-node-prod-02.medorax-vpc",
    descriptionSuffix:
      "is up-to-date. WAL archiving compression ratio: 4.8x.",

    actions: {
      inspect: {
        label: "Inspect Replication Lag",
      },
      failover: {
        label: "Emergency Failover",
        icon: "dangerous",
      },
    },

    icon: "terminal",
  },

  messages: {
    backupStarted: "Snapshot In Progress...",
    backupQueued: "Snapshot Queued!",
    backupSuccess: "Backup snapshot queued successfully.",
    manualBackupSuccess: "Manual backup request queued successfully.",
    schemaSelected: "Import destination updated.",
    fileSelected: "File selected successfully.",
    invalidFile: "Please select a valid CSV, XLSX, or JSON file under 50MB.",
    ingestionStarted: "Module ingestion request submitted.",
    auditTrail: "Audit trail opened.",
    templates: "CSV templates opened.",
    viewSnapshots: "Showing all available snapshots.",
    restore: "Snapshot restore request submitted.",
    download: "Snapshot download requested.",
    errorLog: "Error log download requested.",
    summaryLog: "Summary log opened.",
    export: "Export package requested.",
    replication: "Replication diagnostics opened.",
    failover:
      "Emergency failover requires additional confirmation in the production environment.",
  },
};