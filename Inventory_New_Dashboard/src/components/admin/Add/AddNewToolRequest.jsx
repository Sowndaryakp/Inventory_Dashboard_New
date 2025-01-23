import React, { useState } from 'react';
import { Button, Modal } from 'antd'; // Import Ant Design components
import CreateToolRequest from '../../admin//create/CreateToolRequest';

const AddNewToolRequest = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddCategory = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button onClick={handleAddCategory} className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4">
        Add New Tool Request
      </Button>

      {/* Ant Design Modal for CreateToolRequest */}
      <Modal
        title="Create New Tool Request"
        visible={showForm}
        footer={null}
        onCancel={handleCloseForm}
        centered
      >
        <CreateToolRequest onClose={handleCloseForm} />
      </Modal>
    </div>
  );
};

export default AddNewToolRequest;
