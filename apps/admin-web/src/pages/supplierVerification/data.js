import {
  Users, Clock, AlertTriangle, TrendingUp,
  CheckCircle, XCircle, Eye, Check, X,
  Store, Factory, Truck, Building,
  FileText, Badge, Shield, CreditCard,
  Download, History, Search, Filter,
  ChevronRight, ChevronLeft, RefreshCw,
  Hourglass, Gavel, Verified
} from 'lucide-react';

export const metricsData = [
  {
    title: 'Pending Approvals',
    value: '12',
    change: '+3 today',
    subtitle: '8 Suppliers • 4 Wholesale Chemist',
    icon: Hourglass,
    color: '#235eac',
    iconBg: 'bg-[#f1f3ff]'
  },
  {
    title: 'Average SLA Response',
    value: '4.2',
    unit: 'hrs',
    change: '94% on-target',
    subtitle: 'Standard threshold ≤ 6.0 hours',
    icon: Clock,
    color: '#006d40',
    iconBg: 'bg-[#f1f3ff]'
  },
  {
    title: 'Compliance Flagged',
    value: '2',
    change: 'High risk',
    subtitle: 'Drug license expiry & GSTIN mismatch',
    icon: Gavel,
    color: '#ba1a1a',
    iconBg: 'bg-[#ffdad6]'
  }
];

export const verificationData = [
  {
    id: 1,
    name: 'Apex Lifecare Chemist',
    category: 'B2B Wholesale Chemist',
    icon: Store,
    date: 'Oct 24, 2024',
    time: '09:15 AM',
    form: 'Form 20B/21B',
    gstin: '29ABCDE1234F1Z5',
    credit: '$50,000',
    creditTerms: '45 Days Net',
    riskScore: 18,
    riskLabel: 'Low',
    riskBg: 'bg-[#9cf6bc] text-[#00522f]',
    status: 'Pending',
    statusIcon: Clock,
    statusBg: 'bg-[#f1f3ff] text-[#424751]',
    selected: true,
    flagged: false,
    bgColor: 'bg-[#d6e3ff]',
    iconColor: 'text-[#001b3e]'
  },
  {
    id: 2,
    name: 'Novartis Healthcare Pvt Ltd',
    category: 'Manufacturer / Supplier',
    icon: Factory,
    date: 'Oct 24, 2024',
    time: '07:42 AM',
    form: 'Form 25/28 Mfg',
    gstin: '27AAACN1414L1ZV',
    credit: '$250,000',
    creditTerms: '60 Days Net',
    riskScore: 12,
    riskLabel: 'Low',
    riskBg: 'bg-[#9cf6bc] text-[#00522f]',
    status: 'Pending',
    statusIcon: Clock,
    statusBg: 'bg-[#f1f3ff] text-[#424751]',
    selected: false,
    flagged: false,
    bgColor: 'bg-[#f1f3ff]',
    iconColor: 'text-[#424751]'
  },
  {
    id: 3,
    name: 'Biogenics Pharma Lab',
    category: 'Supplier',
    icon: Building,
    date: 'Oct 23, 2024',
    time: '04:10 PM',
    form: 'Form 20B (Expired)',
    gstin: '33AABCB9823M1Z2',
    credit: '$30,000',
    creditTerms: '30 Days Net',
    riskScore: 78,
    riskLabel: 'High',
    riskBg: 'bg-[#ffdad6] text-[#93000a]',
    status: 'Review Req',
    statusIcon: AlertTriangle,
    statusBg: 'bg-[#ffdad6] text-[#93000a]',
    selected: false,
    flagged: true,
    bgColor: 'bg-[#ffdad6]',
    iconColor: 'text-[#93000a]'
  },
  {
    id: 4,
    name: 'MedPlus Distribution LLC',
    category: 'Regional Distributor',
    icon: Truck,
    date: 'Oct 23, 2024',
    time: '02:30 PM',
    form: 'Form 20B/21B',
    gstin: '07AAACM4421P1ZT',
    credit: '$120,000',
    creditTerms: '45 Days Net',
    riskScore: 24,
    riskLabel: 'Low',
    riskBg: 'bg-[#9cf6bc] text-[#00522f]',
    status: 'Pending',
    statusIcon: Clock,
    statusBg: 'bg-[#f1f3ff] text-[#424751]',
    selected: false,
    flagged: false,
    bgColor: 'bg-[#f1f3ff]',
    iconColor: 'text-[#424751]'
  }
];

export const drawerData = {
  id: '#KYC-9942',
  name: 'Apex Lifecare Chemist',
  category: 'Retail & Wholesale Pharmacy Network',
  gstin: '29ABCDE1234F1Z5',
  drugLicense: 'Form 20B & 21B Valid',
  validity: '14/Nov/2023 — 13/Nov/2028',
  pharmacist: 'Dr. Rahul V. (Reg #KA-44102)',
  creditLimit: '$50,000',
  creditTerms: '45 Days Net',
  recommendedMax: '$60,000',
  documents: [
    {
      name: 'Trade_License_2024.pdf',
      size: '2.4 MB',
      type: 'PDF',
      badge: 'Signed Digital Stamp',
      icon: FileText
    },
    {
      name: 'Pharmacist_Cert_Form20B.pdf',
      size: '1.1 MB',
      type: 'PDF',
      badge: 'Council Attested',
      icon: Badge
    }
  ]
};