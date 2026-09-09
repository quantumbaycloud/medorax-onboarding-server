import {
  Users,
  Shield,
  UserCheck,
  AlertTriangle,
  Package,
  ShoppingCart,
  Receipt,
  Pill,
  BadgeCheck,
  Store,
  ChartNoAxesCombined,
  ClipboardPenLine,
  Settings,
  Lock,
  Eye,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  History
} from 'lucide-react';

export const metricsData = [
  {
    title: 'Total Roles',
    value: '12',
    change: '+2 this quarter',
    icon: Users,
    color: '#235eac',
    iconBg: 'bg-[#f1f3ff]'
  },
  {
    title: 'Active Permissions',
    value: '84',
    change: '96% coverage',
    icon: Shield,
    color: '#006d40',
    iconBg: 'bg-[#9cf6bc]/30'
  },
  {
    title: 'Custom Roles',
    value: '4',
    change: '3 pending approval',
    icon: UserCheck,
    color: '#235eac',
    iconBg: 'bg-[#f1f3ff]'
  },
  {
    title: 'Policy Violations',
    value: '2',
    change: 'Requires review',
    icon: AlertTriangle,
    color: '#ba1a1a',
    iconBg: 'bg-[#ffdad6]/40'
  }
];

export const rolesData = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    userCount: 3,
    icon: Settings,
    active: false,
    bgColor: 'bg-[#f1f3ff]'
  },
  {
    id: 'pharmacy-manager',
    name: 'Pharmacy Manager',
    description: 'Complete pharmacy operations & staff oversight',
    userCount: 18,
    icon: BadgeCheck,
    active: true,
    bgColor: 'bg-[#f1f3ff]'
  },
  {
    id: 'lead-pharmacist',
    name: 'Lead Pharmacist',
    description: 'Rx approvals, narcotics control & clinical oversight',
    userCount: 24,
    icon: Pill,
    active: false,
    bgColor: 'bg-[#f1f3ff]'
  },
  {
    id: 'cashier-billing',
    name: 'Cashier & Billing',
    description: 'POS operations, invoices & payment processing',
    userCount: 42,
    icon: Receipt,
    active: false,
    bgColor: 'bg-[#f1f3ff]'
  },
  {
    id: 'compliance-auditor',
    name: 'Compliance Auditor',
    description: 'Audit trails, regulatory reporting & quality checks',
    userCount: 7,
    icon: ClipboardPenLine,
    active: false,
    bgColor: 'bg-[#f1f3ff]'
  }
];

export const permissionModules = [
  {
    id: 'inventory',
    name: 'Inventory Management',
    icon: Package,
    description: 'Stock ledger, batch numbers, quarantine & transfers',
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
      export: true
    }
  },
  {
    id: 'procurement',
    name: 'Procurement & Inwarding',
    icon: ShoppingCart,
    description: 'Purchase Orders, GRN matching, delivery receipts',
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
      export: true
    }
  },
  {
    id: 'billing',
    name: 'Billing & Point of Sale',
    icon: Receipt,
    description: 'Cash registers, digital transactions, refund reversals',
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
      export: true
    }
  },
  {
    id: 'prescriptions',
    name: 'Customer Records & Prescriptions',
    icon: Pill,
    description: 'Patient identities, dosage histories, doctor scripts',
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
      export: false
    }
  },
  {
    id: 'staff',
    name: 'Staff Management & Rosters',
    icon: BadgeCheck,
    description: 'Shift schedules, branch assignments, attendance',
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
      export: true
    }
  },
  {
    id: 'suppliers',
    name: 'Supplier Management & Bank Details',
    icon: Store,
    description: 'Vendor catalogs, payment terms, sensitive banking',
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      export: false
    }
  },
  {
    id: 'financials',
    name: 'Financial Reports & Tax',
    icon: ChartNoAxesCombined,
    description: 'P&L reports, reconciliation logs, VAT statements',
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      export: true
    }
  },
  {
    id: 'audit',
    name: 'System & Audit Logs',
    icon: ClipboardPenLine,
    description: 'Immutable activity stream, IP access records',
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      export: true
    }
  }
];

export const permissionActions = [
  'View',
  'Create',
  'Edit',
  'Delete',
  'Approve',
  'Export'
];