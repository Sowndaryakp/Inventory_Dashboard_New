import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { MdPrecisionManufacturing } from 'react-icons/md';

const ToolsInUse = () => {
  const [toolsInUse, setToolsInUse] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    fetch('http://localhost:8986/inventory/analytics')
      .then((response) => response.json())
      .then((data) => {
        setToolsInUse(data.tools_in_use);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching total tools:', error);
        setLoading(false);
      });
  }, []);

  // Skeleton loading UI
  if (loading) {
    return (
      <div className="ml-4">
        <Card className="flex items-center w-80 h-24 mt-4 mb-4 mr-4 animate-pulse">
          <div className="flex items-center justify-center w-32 h-32">
            <div className="bg-gray-300 rounded-full h-14 w-16"></div>
          </div>
          <div>
            <h3 className="text-base font-bold">IN USE</h3>
            <p className="font-bold text-center text-2xl text-gray-500">Loading...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    // <div className="ml-4">
    //   <Card
    //     className="flex items-center w-80 h-24 mr-4 hover:bg-sky-400 hover:text-white hover:scale-105 transition-all cursor-pointer"
    //     bodyStyle={{ display: 'flex', alignItems: 'center' }}
    //   >
    //     <div className="flex items-center justify-center w-32 h-32">
    //       <MdPrecisionManufacturing className="h-14 w-16" />
    //     </div>
    //     <div>
    //       <h3 className="text-base font-bold">IN USE</h3>
    //       <p
    //         className={`font-bold text-center text-2xl ${
    //           toolsInUse !== null ? '' : 'text-gray-500'
    //         }`}
    //       >
    //         {toolsInUse !== null ? `${toolsInUse}` : 'Loading...'}
    //       </p>
    //     </div>
    //   </Card>
    // </div>
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center">
    <div className="mr-4">
      <MdPrecisionManufacturing className="h-12 w-12 text-sky-500" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-600 uppercase">In Use</h3>
      <p className="text-2xl font-bold text-gray-800">{toolsInUse ?? 0}</p>
    </div>
  </div>
  );
};

export default ToolsInUse;
