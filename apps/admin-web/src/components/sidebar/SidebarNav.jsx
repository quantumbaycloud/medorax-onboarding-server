import React from 'react';
import SidebarNavItem from './SidebarNavItem';
import { sidebarNavigation } from '../../constants/sidebarNavigation';

const SidebarNav = () => {
  return (
    <nav className="flex-1 overflow-y-auto px-1 py-2 flex flex-col gap-1">
      {sidebarNavigation.map((item) => (
        <SidebarNavItem key={item.key} item={item} />
      ))}
    </nav>
  );
};

export default SidebarNav;