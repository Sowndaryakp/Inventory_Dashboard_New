import React, { useState } from 'react';
import { Button, Modal } from 'antd'; // Importing components from Ant Design
import CreateTool from '../../admin/create/CreateTool';
import ToolTable from '../../admin/tables/ToolTable'; // Import the ToolTable component

const ToolCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh

  const handleAddTool = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleToolAdded = () => {
    setRefreshTable(true); // Trigger table refresh
  };

  const handleTableRefreshed = () => {
    setRefreshTable(false); // Reset table refresh state
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button onClick={handleAddTool} className="text-white hover:text-sky-500 bg-sky-600 mt-4">
        Add Tool
      </Button>
      
      {/* Conditionally render the CreateTool component as a modal */}
      <Modal
        title="Add New Tool"
        visible={showForm}
        footer={null}
        onCancel={handleCloseForm}
      >
        <CreateTool onClose={handleCloseForm} onToolAdded={handleToolAdded} />
      </Modal>
      
      {/* Render the ToolTable component */}
      <div className="mt-4 overflow-x-auto">
        <ToolTable refreshTable={refreshTable} onTableRefreshed={handleTableRefreshed} />
      </div>
    </div>
  );
};

export default ToolCard;
