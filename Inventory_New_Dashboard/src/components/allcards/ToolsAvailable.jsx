import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ToolsAvailable = () => {
  const [toolsAvailable, setToolsAvailable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8986/inventory/analytics')
      .then((response) => response.json())
      .then((data) => {
        setToolsAvailable(data.tools_available);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tools available:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center">
        <div className="mr-4">
          <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Tools Available</h3>
          <p className="text-2xl font-bold text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center">
      <div className="mr-4">
        <FaCheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase">Tools Available</h3>
        <p className="text-2xl font-bold text-gray-800">{toolsAvailable ?? 0}</p>
      </div>
    </div>
  );
};

export default ToolsAvailable;
