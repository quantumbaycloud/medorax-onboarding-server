export const SYSTEM_SETTINGS = {
  environment: {
    status: "Production Live",
    version: "v4.8",
  },

  company: {
    logoName: "Medorax Logo_v4.svg",
    logoDescription: "SVG, PNG under 2MB (300dpi)",

    legalName: "Medorax Healthcare Technologies Pvt Ltd",

    tradeName: "Medorax Pharma Retail & Distribution",

    cin: "U74999DL2018PTC334812",

    incorporationDate: "2018-05-14",

    registeredAddress:
      "Plot 42-A, Life Sciences Industrial Hub, Sector 62, Gurgaon, HR - 122002, India",

    enterpriseEmail: "compliance.admin@medorax.com",

    contactPhone: "+91 (124) 4982-3100",
  },

  licensing: {
    gstin: "06AAACM4928L1ZG",

    gstStatus: "Active GST Status",

    drugLicense20B: {
      label: "Drug License Form 20B (Retail Sale)",
      value: "DL-20B-184920-HR",
    },

    drugLicense21B: {
      label: "Drug License Form 21B (Wholesale Supply)",
      value: "DL-21B-948172-WZ",
    },

    jurisdictions: [
      "State Drugs Standard Control Organization (SDSCO) - Zone IV",
      "Central Drugs Standard Control Organisation (CDSCO) HQ",
      "Food and Drug Administration (FDA) Regional Board",
    ],

    selectedJurisdiction:
      "State Drugs Standard Control Organization (SDSCO) - Zone IV",

    complianceStatus: "Audited & Compliant",
  },

  taxRates: [
    {
      id: 1,
      name: "Formulations (Medicines)",
      hsn: "HSN 3004",
      rate: "12%",
    },
    {
      id: 2,
      name: "Vaccines & Blood Products",
      hsn: "HSN 3002",
      rate: "5%",
    },
    {
      id: 3,
      name: "Diagnostic & Medical Devices",
      hsn: "HSN 9018 / 9025",
      rate: "18%",
    },
  ],

  branches: [
    {
      id: 1,
      facility: "North Central Logistics (HQ)",
      locationCode: "DEL-01-WHS",
      licenseValidity: "Valid till 2028",
      manager: "Vikram Singhania",
      status: "active",
    },
    {
      id: 2,
      facility: "Mumbai Western Gateway Depot",
      locationCode: "BOM-03-LOG",
      licenseValidity: "Valid till 2027",
      manager: "Pooja Nair",
      status: "active",
    },
    {
      id: 3,
      facility: "Bengaluru Biotech Park Node",
      locationCode: "BLR-02-RTC",
      licenseValidity: "Valid till 2029",
      manager: "Dr. Arvind Rao",
      status: "active",
    },
    {
      id: 4,
      facility: "Kolkata East Dispatch Warehouse",
      locationCode: "CCU-01-EXP",
      licenseValidity: "Renewal In-Review",
      manager: "Ananya Banerjee",
      status: "review",
    },
  ],

  facilityDistribution: [
    {
      id: 1,
      name: "Delhi Hub",
      percentage: 60,
    },
    {
      id: 2,
      name: "Mumbai",
      percentage: 30,
    },
    {
      id: 3,
      name: "Other Nodes",
      percentage: 10,
    },
  ],

  audit: {
    savedBy: "Sarah Jenkins",
    savedByRole: "Super Admin",
    timestamp: "2025-02-23 09:41 UTC",
    revision: "REV-8924",
  },

  tabs: [
    {
      id: "company",
      label: "Company Profile",
      icon: "domain",
    },
    {
      id: "branches",
      label: "Branches & Locations",
      icon: "store",
    },
    {
      id: "tax",
      label: "Tax & GST Rates",
      icon: "percent",
    },
    {
      id: "currency",
      label: "Currency & Units",
      icon: "currency",
    },
    {
      id: "integration",
      label: "Integration Defaults",
      icon: "integration",
    },
  ],

  currency: "INR",

  currencyOptions: [
    {
      code: "INR",
      name: "Indian Rupee",
      symbol: "₹",
    },
    {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
    },
    {
      code: "EUR",
      name: "Euro",
      symbol: "€",
    },
  ],

  weightUnit: "Kilogram (kg)",

  weightUnits: [
    "Kilogram (kg)",
    "Gram (g)",
    "Milligram (mg)",
  ],

  volumeUnit: "Litre (L)",

  volumeUnits: [
    "Litre (L)",
    "Millilitre (mL)",
  ],

  dateFormat: "DD/MM/YYYY",

  dateFormats: [
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
  ],

  integrations: [
    {
      id: "erp",
      name: "ERP Synchronization",
      description: "Synchronize enterprise transactions and master data.",
      enabled: true,
    },
    {
      id: "gst",
      name: "GST Portal Integration",
      description: "Connect statutory tax reporting workflows.",
      enabled: true,
    },
    {
      id: "warehouse",
      name: "Warehouse Management",
      description: "Synchronize inventory and warehouse operations.",
      enabled: true,
    },
    {
      id: "notifications",
      name: "Notification Gateway",
      description: "Enable enterprise notification delivery.",
      enabled: false,
    },
  ],
};

