import Link from 'next/link';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // using react-icons
import { TbShoppingCartStar } from 'react-icons/tb';
import { CiViewList } from 'react-icons/ci';
import { GrUserSettings } from 'react-icons/gr';
import { MdOutlineManageHistory } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-700 text-white flex flex-col p-4">
      {/* Logo or Title */}

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded"
        >
          <IoHomeOutline /> Home
        </Link>
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded"
        >
          <TbShoppingCartStar /> Orders
        </Link>
        <Link
          href="/dashboard/products"
          className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded"
        >
          <CiViewList /> Products
        </Link>
        <Link
          href="/dashboard/users"
          className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded"
        >
          <GrUserSettings /> Users
        </Link>
        <Link
          href="/dashboard/control"
          className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded"
        >
          <MdOutlineManageHistory /> Control
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded"
        >
          <IoSettingsOutline /> Settings
        </Link>
      </nav>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Logout Button */}
      <button className="flex cursor-pointer items-center gap-3 hover:bg-gray-600 p-2 rounded">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
