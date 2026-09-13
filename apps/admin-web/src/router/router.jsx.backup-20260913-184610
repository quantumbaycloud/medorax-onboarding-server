import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

import Overview from '../pages/Overview';
import UserManagement from '../pages/UserManagement';
import RolesPermissions from '../pages/RolesPermissions';
import SupplierVerification from '../pages/SupplierVerification';
import OnboardingApprovals from '../pages/OnboardingApprovals';

import AuditLogs from '../components/auditLogs';
import SystemSettings from '../components/systemSettings';
import NotificationsAlerts from '../components/notificationsAlerts';
import DataManagement from '../components/dataManagement';
import SecuritySettings from '../components/securitySettings';
import ERPConfiguration from '../pages/ERPConfiguration';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'overview', element: <Overview /> },
      { path: 'user-management', element: <UserManagement /> },
      { path: 'roles-permissions', element: <RolesPermissions /> },
      { path: 'supplier-verification', element: <SupplierVerification /> },
      { path: 'onboarding-approvals', element: <OnboardingApprovals /> },

      { path: 'erp-configuration', element: <ERPConfiguration /> },
      { path: 'system-settings', element: <SystemSettings /> },
      { path: 'audit-logs', element: <AuditLogs /> },
      { path: 'notifications-alerts', element: <NotificationsAlerts /> },
      { path: 'data-management', element: <DataManagement /> },
      { path: 'security-settings', element: <SecuritySettings /> }
    ]
  }
]);
