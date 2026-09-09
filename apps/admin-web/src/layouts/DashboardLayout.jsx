import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className="pl-72 flex flex-col min-h-screen">
        <Navbar />
        <main className="w-full pt-16 bg-[#f9f9ff] flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;