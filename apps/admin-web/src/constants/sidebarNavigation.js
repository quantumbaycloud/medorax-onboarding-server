import {
  LayoutGrid,
  UserCog,
  ShieldCheck,
  BadgeCheck, ClipboardCheck,
  Settings,
  ReceiptText,
  SlidersHorizontal,
  Database,
  LockKeyhole
} from 'lucide-react';

export const sidebarNavigation = [
  {
    key: 'overview',
    label: 'Overview',
    icon: LayoutGrid,
    path: '/overview'
  },
  {
    key: 'user-management',
    label: 'User Management',
    icon: UserCog,
    path: '/user-management'
  },
  {
    key: 'roles-permissions',
    label: 'Roles & Permissions',
    icon: ShieldCheck,
    path: '/roles-permissions'
  },
  {
    key: 'onboarding-approvals',
    label: 'Pharmacy Onboarding Approvals',
    icon: ClipboardCheck,
    path: '/onboarding-approvals'
  },
  {
    key: 'supplier-verification',
    label: 'Supplier/Customer Verification',
    icon: BadgeCheck,
    path: '/supplier-verification'
  },
  {
    key: 'erp-configuration',
    label: 'ERP Configuration',
    icon: Database,
    path: '/erp-configuration'
  },
  {
    key: 'system-settings',
    label: 'System Settings',
    icon: Settings,
    path: '/system-settings'
  },
  {
    key: 'audit-logs',
    label: 'Audit Logs',
    icon: ReceiptText,
    path: '/audit-logs'
  },
  {
    key: 'notifications-alerts',
    label: 'Notifications & Alerts Config',
    icon: SlidersHorizontal,
    path: '/notifications-alerts'
  },
  {
    key: 'data-management',
    label: 'Data Management',
    icon: Database,
    path: '/data-management'
  },
  {
    key: 'security-settings',
    label: 'Security Settings',
    icon: LockKeyhole,
    path: '/security-settings'
  }
];