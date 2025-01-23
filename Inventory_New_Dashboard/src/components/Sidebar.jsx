import React, { useState, useEffect } from 'react';
import { Home, Plus, Files, FileStack, Eye, Menu, ChevronRight, CheckCircle, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cmti.png';
import { useUser } from './UserContext';
import { Image } from 'antd';

const Logo = ({ isCollapsed }) => (
  <div className={`flex items-center px-4 py-5  ${isCollapsed ? 'justify-center' : ''}`}>
    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-white to-white flex items-center justify-center text-white font-bold text-xl">
    <div className="p-4 flex justify-center ml-36">
        <Image
          src={logo}
          alt="BEL Logo"
          preview={false}
          width={isCollapsed ? 40 : 100}
          className="transition-all duration-300"
        />
      </div>
    </div>
    {!isCollapsed && (
      <span className="ml-2 text-white text-lg font-semibold">
        <div
          className="logo"
          style={{
            height: '50px',
            width: '190',
            margin: '1px',
            textAlign: 'center',
          }}
        >
          {/* <img
            src={logo}
            alt="Logo"
            style={{
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          /> */}
        </div>
      </span>
    )}
  </div>
);

const MenuItem = ({ icon: Icon, label, onClick, isActive, isCollapsed }) => (
  <div className="flex flex-col">
    <div
      className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
        isActive
          ? 'bg-sky-600 text-white font-bold border-r-4 border-white-500'
          : 'hover:bg-sky-600 hover:text-white'
      }`}
      onClick={onClick}
    >
      <Icon 
        size={20} 
        className={`${
          isActive ? 'text-white' : 'text-inherit'
        }`} 
      />
      {!isCollapsed && (
        <span className={`ml-3 ${
          isActive ? 'text-white font-bold' : 'text-inherit'
        }`}>
          {label}
        </span>
      )}
    </div>
  </div>
);



const Sidebar = () => {
  // State to manage if the sidebar is collapsed and which item is active
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  // Function to toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  // Function to handle menu item click
  const handleMenuClick = (path) => {
    setActiveItem(path); // Update the active item state
    navigate(`/${path}`); // Navigate to the selected path
  };

  // Optional: Set the active item based on the current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath.split('/').pop()); // Set active item based on the path
  }, [navigate]);

  return (
    <div
      className={`bg-sky-800 shadow-lg text-white h-full flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex justify-between items-center p-4">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isCollapsed ? <ChevronRight size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {user.role === 'Admin' && (
          <>
            <MenuItem 
              icon={Home} 
              label="Overview" 
              isActive={activeItem === 'dashboard'}
              onClick={() => handleMenuClick('admin/dashboard')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Plus} 
              label="Inventory" 
              isActive={activeItem === 'admin_inventory'}
              onClick={() => handleMenuClick('admin/admin_inventory')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Files} 
              label="Batch" 
              isActive={activeItem === 'batch'}
              onClick={() => handleMenuClick('admin/batch')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={FileStack} 
              label="Location" 
              isActive={activeItem === 'location'}
              onClick={() => handleMenuClick('admin/location')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={CheckCircle} 
              label="Approve Request" 
              isActive={activeItem === 'approve_request'}
              onClick={() => handleMenuClick('admin/approve_request')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={BarChart2} 
              label="Add Data Dashboard" 
              isActive={activeItem === 'add_data_dashboard'}
              onClick={() => handleMenuClick('admin/add_data_dashboard')} 
              isCollapsed={isCollapsed} 
            />
          </>
        )}
        {user.role === 'User' && (
          <>
            <MenuItem 
              icon={Home} 
              label="User Dashboard" 
              isActive={activeItem === 'dashboard'}
              onClick={() => handleMenuClick('user/dashboard')} 
              isCollapsed={isCollapsed} 
            />
            <MenuItem 
              icon={Files} 
              label="Inventory" 
              isActive={activeItem === 'inventory'}
              onClick={() => handleMenuClick('user/inventory')} 
              isCollapsed={isCollapsed} 
            />
          </>
        )}
      </div>
      <Logo isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
