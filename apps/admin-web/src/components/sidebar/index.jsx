import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarNav from './SidebarNav'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => (
  <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-[#c3c6d2] bg-white md:flex">
    <SidebarHeader />
    <SidebarNav />
    <SidebarFooter />
  </aside>
)

export default Sidebar
