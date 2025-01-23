import React, { useState } from 'react';
import { Button, Modal } from 'antd'; // Import Ant Design components
import CreateToolLocationRequest from '../../admin/create/CreateToolLocation'; // Import the CreateToolLocationRequest component

const AddNewToolLocations = () => {
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
        Add New Tool Location
      </Button>

      {/* Ant Design Modal for CreateToolLocationRequest */}
      <Modal
        title="Create New Tool Location"
        visible={showForm}
        footer={null}
        onCancel={handleCloseForm}
        centered
      >
        <CreateToolLocationRequest onClose={handleCloseForm} />
      </Modal>
    </div>
  );
};

export default AddNewToolLocations;
