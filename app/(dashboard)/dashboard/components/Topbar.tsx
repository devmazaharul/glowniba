import React from 'react';
import { GrUserSettings } from 'react-icons/gr';

const Topbar = () => {
  return (
    <div className="bg-gray-600 text-gray-100 px-6 py-2 flex items-center justify-between">
      <div className="text-2xl font-bold ">Dashboard</div>
      <div>
        <GrUserSettings className="h-10  cursor-pointer" />
      </div>
    </div>
  );
};

export default Topbar;
