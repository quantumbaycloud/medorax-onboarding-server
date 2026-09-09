import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#ffffff] border-r border-[#c3c6d2] z-50 flex flex-col">
      <SidebarHeader />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;