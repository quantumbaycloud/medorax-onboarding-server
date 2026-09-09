import { 
  Users, Shield, Pill, AlertTriangle,
  Edit, Key, Ban, CheckCircle
} from 'lucide-react';

export const metricsData = [
  {
    title: 'Total Accounts',
    value: '1,248',
    change: '+12 this week',
    icon: Users,
    color: '#235eac',
    iconBg: 'bg-[#f1f3ff]'
  },
  {
    title: 'Active Clearances',
    value: '1,192',
    change: '95.5% certified',
    icon: Shield,
    color: '#006d40',
    iconBg: 'bg-[#9cf6bc]/30'
  },
  {
    title: 'Licensed Pharmacists',
    value: '342',
    change: 'Across 18 regional hubs',
    icon: Pill,
    color: '#235eac',
    iconBg: 'bg-[#f1f3ff]'
  },
  {
    title: 'Flagged / Suspended',
    value: '14',
    change: 'Review required',
    icon: AlertTriangle,
    color: '#ba1a1a',
    iconBg: 'bg-[#ffdad6]/40'
  }
];

export const usersData = [
  {
    id: 1,
    initials: 'JV',
    name: 'Dr. Jennifer Vance, PharmD',
    empId: 'EMP-88410',
    badge: 'DEA Certified',
    email: 'j.vance@medorax-pharma.org',
    role: 'Pharmacy Manager',
    roleBg: 'bg-[#e5e8f4] text-[#235eac]',
    branch: 'Central Pharma Depot',
    status: 'Active',
    statusBg: 'bg-[#9cf6bc]/50 text-[#0f7345]',
    statusDot: 'bg-[#006d40]',
    lastLogin: 'Today, 08:24 AM',
    avatarBg: 'bg-[#235eac] text-[#ffffff]'
  },
  {
    id: 2,
    initials: 'MB',
    name: 'Marcus Boyd',
    empId: 'EMP-90214',
    badge: 'Systems Auth',
    email: 'm.boyd@medorax-pharma.org',
    role: 'Super Admin',
    roleBg: 'bg-[#004287] text-[#ffffff]',
    branch: 'Regional Headquarters',
    status: 'Active',
    statusBg: 'bg-[#9cf6bc]/50 text-[#0f7345]',
    statusDot: 'bg-[#006d40]',
    lastLogin: 'Yesterday, 17:15',
    avatarBg: 'bg-[#e5e8f4] text-[#235eac]'
  },
  {
    id: 3,
    initials: 'PS',
    name: 'Priya Sharma, RPh',
    empId: 'EMP-67312',
    badge: 'Clinical Spec',
    email: 'p.sharma@medorax-pharma.org',
    role: 'Lead Pharmacist',
    roleBg: 'bg-[#e5e8f4] text-[#171c24]',
    branch: 'Downtown Hub',
    status: 'Active',
    statusBg: 'bg-[#9cf6bc]/50 text-[#0f7345]',
    statusDot: 'bg-[#006d40]',
    lastLogin: 'Oct 24, 11:40 AM',
    avatarBg: 'bg-[#d6e3ff] text-[#08468b]'
  },
  {
    id: 4,
    initials: 'DL',
    name: 'David Lee',
    empId: 'EMP-44109',
    badge: 'Cashier / POS',
    email: 'd.lee@medorax-pharma.org',
    role: 'Cashier',
    roleBg: 'bg-[#e5e8f4] text-[#171c24]',
    branch: 'Northside Clinic',
    status: 'Suspended',
    statusBg: 'bg-[#ffdad6] text-[#ba1a1a]',
    statusDot: 'bg-[#ba1a1a]',
    lastLogin: 'Oct 19, 14:02 PM',
    avatarBg: 'bg-[#ffdad6] text-[#93000a]'
  },
  {
    id: 5,
    initials: 'AR',
    name: 'Amina Rahman, CPhT',
    empId: 'EMP-55201',
    badge: 'Sterile Compounding',
    email: 'a.rahman@medorax-pharma.org',
    role: 'Dispensing Tech',
    roleBg: 'bg-[#e5e8f4] text-[#171c24]',
    branch: 'Downtown Hub',
    status: 'Active',
    statusBg: 'bg-[#9cf6bc]/50 text-[#0f7345]',
    statusDot: 'bg-[#006d40]',
    lastLogin: 'Today, 07:11 AM',
    avatarBg: 'bg-[#d9e3f7] text-[#121c2a]'
  },
  {
    id: 6,
    initials: 'KL',
    name: 'Kevin Lindqvist',
    empId: 'EMP-11983',
    badge: 'Inventory Ops',
    email: 'k.lindqvist@medorax-pharma.org',
    role: 'Inventory Mgr',
    roleBg: 'bg-[#e5e8f4] text-[#171c24]',
    branch: 'Westlake Logistics',
    status: 'Active',
    statusBg: 'bg-[#9cf6bc]/50 text-[#0f7345]',
    statusDot: 'bg-[#006d40]',
    lastLogin: 'Oct 23, 16:45 PM',
    avatarBg: 'bg-[#dfe2ef] text-[#171c24]'
  },
  {
    id: 7,
    initials: 'SM',
    name: 'Sofia Morales',
    empId: 'EMP-72108',
    badge: 'Quality Assurance',
    email: 's.morales@medorax-pharma.org',
    role: 'Compliance Officer',
    roleBg: 'bg-[#e5e8f4] text-[#171c24]',
    branch: 'Central Pharma Depot',
    status: 'Inactive',
    statusBg: 'bg-[#e5e8f4] text-[#424751]',
    statusDot: 'bg-[#737782]',
    lastLogin: 'Sep 30, 09:12 AM',
    avatarBg: 'bg-[#dfe2ef] text-[#424751]'
  }
];

export const roles = ['All Roles', 'Super Admin', 'Pharmacy Manager', 'Lead Pharmacist', 'Dispensing Tech', 'Cashier'];
export const statuses = ['All Statuses', 'Active', 'Suspended', 'Inactive'];
export const branches = ['All Branches', 'Northside Clinic', 'Downtown Hub', 'Central Pharma Depot', 'Westlake Logistics'];