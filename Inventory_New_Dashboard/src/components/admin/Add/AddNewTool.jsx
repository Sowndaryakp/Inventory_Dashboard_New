import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CreateToolRequest from '../create/CreateAddNewToolRequest';
// import CategoryTable from '../tables/CategoryTable'; // Import the CategoryTable component

const AddNewTool = () => {
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
      {/* Ant Design Modal for the form */}
      <Modal
        title="Create Tool Request"
        visible={showForm}
        onCancel={handleCloseForm}
        footer={null}
        centered
      >
        <CreateToolRequest onClose={handleCloseForm} />
      </Modal>
    </div>
  );
};

export default AddNewTool;
