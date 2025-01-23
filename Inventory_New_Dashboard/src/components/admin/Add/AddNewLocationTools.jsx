import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CreateLocation from '../create/CreateLocation';

const AddNewLocationTools = () => {
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
        Add New Location
      </Button>
      <Modal
        title="Create New Location"
        visible={showForm}
        onCancel={handleCloseForm}
        footer={null}
      >
        <CreateLocation onClose={handleCloseForm} />
      </Modal>
    </div>
  );
};

export default AddNewLocationTools;
