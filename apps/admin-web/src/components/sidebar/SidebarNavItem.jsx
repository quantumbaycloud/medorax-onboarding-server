import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        flex items-center gap-2 px-4 py-2 rounded-md
        transition-colors border-l-2 border-transparent
        text-[14px] font-medium leading-5

        ${
          isActive
            ? 'bg-[#9cf6bc] text-[#002110] font-semibold rounded-md'
            : 'text-[#424751] hover:bg-[#f1f3ff] hover:text-[#171c24]'
        }
      `}
      data-path={item.key}
    >
      <Icon className="w-5 h-5" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
};

export default SidebarNavItem;