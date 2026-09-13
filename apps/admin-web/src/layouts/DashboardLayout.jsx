import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'

const DashboardLayout = () => (
  <div className="min-h-screen bg-[#f9f9ff]">
    <Sidebar />

    <div className="min-h-screen md:pl-72">
      <Navbar />

      <main className="w-full px-4 pb-8 pt-20 sm:px-6">
        <Outlet />
      </main>
    </div>
  </div>
)

export default DashboardLayout
