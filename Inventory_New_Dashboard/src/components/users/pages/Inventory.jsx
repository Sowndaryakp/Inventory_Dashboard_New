import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, message } from 'antd';
import ToolTable from '../table/ToolTableInventory';
import TotalToolsCard from '../../allcards/TotalTools';
import RequestToolCard from '../cards/RequestCard';

const { Content } = Layout;

const Inventory = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8986/tools');
      setTools(response.data);
    } catch (error) {
      message.error('Error fetching tools');
      console.error('Error fetching data:', error);
    }
  };

  const handleToolRequest = (tool) => {
    setSelectedTool(tool);
  };

  const handleCloseRequest = () => {
    setSelectedTool(null);
  };

  return (
    <Layout className="p-4 bg-gray-50">
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 mb-6">
        <div className="md:w-1/7">
          <TotalToolsCard />
        </div>
      </div>

      <Content>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ToolTable 
            tools={tools} 
            onToolRequest={handleToolRequest}
          />
        </div>
      </Content>

      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96">
            <RequestToolCard 
              tool={selectedTool} 
              onClose={handleCloseRequest} 
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Inventory;