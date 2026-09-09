import React from 'react';
import OverviewHeader from './OverviewHeader';
import OverviewMetrics from './OverviewMetrics';
import PendingActions from './PendingActions';
import ClusterOperations from './ClusterOperations';
import AuditStream from './AuditStream';
import SystemStatus from './SystemStatus';

const Overview = () => {
  return (
    <div className="flex flex-col w-full">
      <OverviewHeader />
      <OverviewMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <PendingActions />
          <ClusterOperations />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AuditStream />
        </div>
      </div>
      <SystemStatus />
    </div>
  );
};

export default Overview;