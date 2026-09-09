import React from 'react';
import NavbarHeader from './NavbarHeader';
import NavbarActions from './NavbarActions';
import NavbarProfile from './NavbarProfile';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[rgba(249,249,255,0.95)] backdrop-blur-md border-b border-[#c3c6d2] z-40 flex items-center justify-between px-6">
      <NavbarHeader />
      <div className="flex items-center gap-4">
        <NavbarActions />
        <NavbarProfile />
      </div>
    </header>
  );
};

export default Navbar;