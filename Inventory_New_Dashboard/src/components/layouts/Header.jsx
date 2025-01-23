import React, { useState } from 'react';
import { Search, Mail, Bell, Files, ChevronDown, UserRound, LogOut } from 'lucide-react';
import { useUser } from '../UserContext'; // Import the UserContext
import cmti from '../../assets/cmti.png';
import buhler from '../../assets/buhler.png';
import cmtilogo from '../../assets/cmti_logo.png'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Header = () => {
  const { user, setUser } = useUser(); // Get the user data and setter function from the context
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleMail = () => setIsMailOpen(!isMailOpen);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    window.location.href = '/login'; // Change this to your login page route
  };

  return (
    <header className="bg-sky-100 shadow-md relative flex items-center justify-between">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 ">
            {/* Logo container */}
          <div className="">
            {/* <img
            src={buhler}
            alt="buhler Logo"
            style={{
              overflow: 'auto',
              maxWidth: '100%', // Responsive max width
              height: '32px',
            }}
            className="block md:hidden mr-6" // Display only on mobile
          /> */}
          </div>

          <div className="flex items-center justify-end ml-auto flex-1">
          {/* <img
            src={buhler}
            alt="buhler Logo"
            style={{
              overflow: 'auto',
              position: 'fixed',
              height: '32px',
            }}
            className="hidden md:block" // Display only on desktop
          /> */}
          </div>

          </div>
          <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 mr-20 ">
            <img
              src={cmtilogo}
              alt="cmti Logo"
              style={{
                overflow: 'auto',
                height: '32px',
                position: 'fixed',
              }}
               className="block md:hidden mr-16" // Display only on mobile
            />

            <img
              src={cmtilogo}
              alt="cmti Logo"
              style={{
                overflow: 'auto',
                height: '40px',
              }}
              className="hidden md:block mr-16"  // Display only on desktop
            />
            {/* <div className="relative mr-6">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-gray-100 text-gray-700 border-0 rounded-lg p-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div> */}
          </div>
            {/* Bell Icon with Notification Dot */}
            <div className="relative p-3 bg-gray rounded-full shadow cursor-pointer" onClick={toggleNotification}>
              <Bell className="text-gray-600" size={20} />
              <span className="absolute top-1 right-1 bg-red-500 h-2 w-2 rounded-full"></span>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New Notification</a>
                </div>
              )}
            </div>
            
            

            {/* <Files className="text-gray-400" size={20} /> */}
            <div className="relative ">
              <div className="flex items-center space-x-1 cursor-pointer">
             {/* User Profile Icon with Notification Dot */}
            <div className="relative w-10 h-10 bg-gray rounded-full shadow overflow-hidden cursor-pointer flex items-center justify-center" onClick={toggleUserMenu}>
              <UserRound className="text-gray-600 w-6 h-6" /> {/* Adjust size if needed */}
            </div>
                <span className='text-gray'>{user ? user.username : 'User'}</span> {/* Dynamically show username */}
                <ChevronDown onClick={toggleUserMenu} className="text-gray-800" size={16} />
              </div>
                {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray border rounded shadow-lg">
                        {user && (
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm leading-5 font-medium text-gray-900">{user.username}</p>
                        <p className="text-sm leading-5 text-gray-500">{user.email}</p> {/* Dynamically show email */}
                      </div>
                    )}
                    <div className="flex items-center justify-between w-full">
                        {/* <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold flex items-center">
                            <LogOut className="text-gray-400" size={20} />
                            <span className="ml-2">Logout</span>
                        </button> */}
                         <Link
                          to="/login"
                          onClick={() => {
                            setUser(null); // Clear user data
                            localStorage.removeItem('access_token'); // Remove token
                          }}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold flex items-center"
                        >
                          <LogOut className="text-gray-400" size={20} />
                          <span className="ml-2">Logout</span>
                        </Link>
                        <button onClick={() => setIsUserMenuOpen(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <span className="ml-2">Cancel</span>
                        </button>
                    </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
