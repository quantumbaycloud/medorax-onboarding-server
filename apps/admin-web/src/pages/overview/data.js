import { 
  Lock, Zap, Percent, Building, User, 
  Settings, Package, Users as UsersIcon, 
  RefreshCw, CreditCard, Database, Shield, 
  Cloud, Server, Plus, ShieldCheck, RotateCcw 
} from 'lucide-react';

export const quickActionsData = [
  { icon: Plus, label: 'Provision User' },
  { icon: ShieldCheck, label: 'Verify Entity' },
  { icon: RotateCcw, label: 'Force MFA Reset' }
];

export const metricsData = [
  {
    title: 'Total Users',
    value: '248',
    change: '+12',
    icon: 'Users',
    color: '#235eac',
    progress: 78,
    target: 'Target pace: 100%',
    period: 'This month'
  },
  {
    title: 'Active Sessions',
    value: '42',
    subtext: 'concurrency',
    icon: 'Laptop',
    color: '#006d40',
    progress: 55,
    details: 'Across 8 regional branches',
    sla: '99.8% SLA'
  },
  {
    title: 'Pending Approvals',
    value: '7',
    badge: '3 High Priority',
    icon: 'Clock',
    color: '#ba1a1a',
    progress: 82,
    queue: 'Escalation queue',
    target: '< 4h target'
  },
  {
    title: 'Security Alerts',
    value: '0',
    badge: 'Nominal',
    icon: 'Shield',
    color: '#006d40',
    progress: 100,
    threat: 'Threat level: Zero',
    audited: 'Audited 2m ago'
  }
];

export const pendingActionsData = [
  {
    id: 'act-1',
    type: 'MFA Reset Request',
    icon: Lock,
    initiator: 'Dr. Marcus Vance',
    role: 'Internal Medicine',
    branch: 'Berlin North',
    priority: 'High',
    priorityColor: 'bg-[#ffdad6] text-[#93000a]'
  },
  {
    id: 'act-2',
    type: 'Branch Access Elevation',
    icon: Zap,
    initiator: 'Elena Rostova',
    role: 'Regional Lead',
    branch: 'Munich Central',
    priority: 'High',
    priorityColor: 'bg-[#ffdad6] text-[#93000a]'
  },
  {
    id: 'act-3',
    type: 'GST Rate Override',
    icon: Percent,
    initiator: 'Klaus Weber',
    role: 'Senior Billing',
    branch: 'Global Tax',
    priority: 'Standard',
    priorityColor: 'bg-[#e5e8f4] text-[#424751]'
  },
  {
    id: 'act-4',
    type: 'New Vendor Approval',
    icon: Building,
    initiator: 'Maria Santos',
    role: 'Procurement Lead',
    branch: 'Madrid South',
    priority: 'High',
    priorityColor: 'bg-[#ffdad6] text-[#93000a]'
  },
  {
    id: 'act-5',
    type: 'Permission Update Request',
    icon: User,
    initiator: 'Thomas Mueller',
    role: 'IT Administrator',
    branch: 'Frankfurt HQ',
    priority: 'Standard',
    priorityColor: 'bg-[#e5e8f4] text-[#424751]'
  }
];

export const clusterData = [
  { time: '08:00', total: 70, sla: 65, transactions: 284 },
  { time: '10:00', sla: 85, total: 82, transactions: 412 },
  { time: '12:00', sla: 90, total: 94, transactions: 528 },
  { time: '14:00', sla: 75, total: 74, transactions: 396 },
  { time: '16:00', sla: 82, total: 88, transactions: 467 },
  { time: '18:00', sla: 55, total: 60, transactions: 312 }
];

export const clusterStats = {
  avgLatency: '24.2 ms',
  syncRate: '99.98%',
  peakLoad: '1,412 req/sec',
  cluster: 'EU-Central-1'
};

export const auditData = [
  {
    initials: 'SJ',
    name: 'Sarah Jenkins',
    action: 'updated Tax Rate to',
    target: '18%',
    tag: 'Fiscal Config',
    tagIcon: Settings,
    time: '12 mins ago',
    bg: 'bg-[#d6e3ff]',
    text: 'text-[#001b3e]'
  },
  {
    initials: 'AR',
    name: 'Alex Rivera',
    action: 'provisioned supplier',
    target: 'Novartis AG',
    tag: 'Vendors',
    tagIcon: Package,
    time: '34 mins ago',
    bg: 'bg-[#9cf6bc]',
    text: 'text-[#00522f]'
  },
  {
    initials: 'ML',
    name: 'Michael Lin',
    action: 'modified permissions for role',
    target: 'Pharmacy Lead',
    tag: 'RBAC',
    tagIcon: UsersIcon,
    time: '1 hour ago',
    bg: 'bg-[#d9e3f7]',
    text: 'text-[#121c2a]'
  },
  {
    initials: 'SY',
    name: 'System Daemon',
    action: 'executed automated ledger reconciliations',
    target: '',
    tag: 'Automations',
    tagIcon: RefreshCw,
    time: '2 hours ago',
    bg: 'bg-[#e5e8f4]',
    text: 'text-[#424751]',
    icon: RefreshCw
  },
  {
    initials: 'DK',
    name: 'David Kim',
    action: 'validated batch order',
    target: '#ORD-90214',
    tag: 'Procurement',
    tagIcon: Package,
    time: '3 hours ago',
    bg: 'bg-[#d6e3ff]',
    text: 'text-[#001b3e]'
  },
  {
    initials: 'EM',
    name: 'Emma Mitchell',
    action: 'approved payment invoice',
    target: '$24,501.00',
    tag: 'Finance',
    tagIcon: CreditCard,
    time: '4 hours ago',
    bg: 'bg-[#f1f3ff]',
    text: 'text-[#171c24]'
  },
  {
    initials: 'JC',
    name: 'James Chen',
    action: 'created new user account',
    target: 'Dr. Olivia Park',
    tag: 'User Management',
    tagIcon: User,
    time: '5 hours ago',
    bg: 'bg-[#d9e3f7]',
    text: 'text-[#121c2a]'
  }
];

export const systemStatusData = [
  {
    icon: Database,
    title: 'PostgreSQL Cluster',
    status: 'Operational (3.1 TB)',
    color: 'text-[#006d40]',
    details: '98.7% uptime',
    version: 'v14.2'
  },
  {
    icon: Shield,
    title: 'MFA Enforcement',
    status: 'Global Active (100% compliant)',
    color: 'text-[#424751]',
    details: '2,438 users enrolled',
    version: 'v2.1.0'
  },
  {
    icon: Cloud,
    title: 'Disaster Recovery',
    status: 'Last sync: 14 mins ago',
    color: 'text-[#737782]',
    details: 'RPO: 15 mins',
    version: 'v3.0.1'
  },
  {
    icon: Server,
    title: 'Redis Cache Cluster',
    status: 'Operational (92% hit rate)',
    color: 'text-[#006d40]',
    details: '24 connected nodes',
    version: 'v7.0.5'
  }
];