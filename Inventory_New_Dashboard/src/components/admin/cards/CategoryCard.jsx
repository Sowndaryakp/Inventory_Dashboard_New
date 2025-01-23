import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CreateCategory from '../../admin/create/CreateCategory';
import CategoryTable from '../../admin/tables/CategoryTable'; // Import the CategoryTable component

const CategoryDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddCategory = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Button onClick={handleAddCategory} style={{ marginTop: 16 }} className="text-white hover:text-sky-500 bg-sky-600 mt-4">
        Add Category
      </Button>

      {/* Ant Design Modal to handle form display */}
      <Modal
        title="Add Category"
        visible={showForm}
        onCancel={handleCloseForm}
        footer={null} // No footer for custom buttons
        destroyOnClose // Destroy the modal content when closed to prevent memory leaks
      >
        <CreateCategory onClose={handleCloseForm} />
      </Modal>

      {/* Render the CategoryTable component */}
      <div style={{ overflowX: 'auto', marginTop: 16, width: '100%' }}>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryDashboard;
