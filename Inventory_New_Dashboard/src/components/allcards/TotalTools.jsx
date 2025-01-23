import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import axios from 'axios';

const TotalToolsCard = () => {
  const [totalTools, setTotalTools] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalTools = async () => {
      try {
        const response = await axios.get('http://localhost:8986/inventory/analytics');
        setTotalTools(response.data.total_tools);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching total tools:', error);
        setLoading(false);
      }
    };

    fetchTotalTools();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md animate-pulse flex items-center">
        <div className="bg-gray-300 rounded-full h-12 w-12 mr-4"></div>
        <div>
          <div className="h-4 bg-gray-300 mb-2 w-24"></div>
          <div className="h-6 bg-gray-300 w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center">
      <div className="mr-4">
        <Wrench className="h-12 w-12 text-sky-500" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase">Total Tools</h3>
        <p className="text-2xl font-bold text-gray-800">{totalTools ?? 0}</p>
      </div>
    </div>
  );
};

export default TotalToolsCard;