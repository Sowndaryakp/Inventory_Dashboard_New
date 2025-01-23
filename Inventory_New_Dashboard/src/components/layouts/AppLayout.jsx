import React from 'react';
import Sidebar from '../Sidebar'; // Adjust the import path as needed
import Header from './Header'; // Adjust the import path as needed
import Footer from './Footer'; // Import the Footer component
import { Outlet } from 'react-router-dom'; 

const Layout = ({  }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-64 bg-gray-800 text-white hidden md:block " /> {/* Sidebar visible on medium screens and up */}
        <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
        </div>
      </div>
      <Footer /> {/* Footer remains at the bottom */}
    </div>
  );
};

export default Layout;