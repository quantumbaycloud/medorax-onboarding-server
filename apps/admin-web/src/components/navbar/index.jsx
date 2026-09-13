import React from 'react'
import NavbarHeader from './NavbarHeader'
import NavbarActions from './NavbarActions'
import NavbarProfile from './NavbarProfile'

const Navbar = () => (
  <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#c3c6d2] bg-[rgba(249,249,255,0.96)] px-4 backdrop-blur-md md:left-72 md:px-6">
    <NavbarHeader />

    <div className="flex items-center gap-2 sm:gap-4">
      <NavbarActions />
      <NavbarProfile />
    </div>
  </header>
)

export default Navbar
