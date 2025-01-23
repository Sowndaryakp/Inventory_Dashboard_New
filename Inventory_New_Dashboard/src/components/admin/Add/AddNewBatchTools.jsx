import React, { useState } from "react";
import { Button, Modal } from "antd";
import CreateBatch from "../../admin/create/CreateBatch";

const AddNewBatchTools = () => {
  const [visible, setVisible] = useState(false);

  const handleAddCategory = () => {
    setVisible(true);
  };

  const handleCloseForm = () => {
    setVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button  onClick={handleAddCategory}  className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4">
        Add New Batch
      </Button>
      <Modal
        visible={visible}
        title="Create New Batch"
        onCancel={handleCloseForm}
        footer={null}
      >
        <CreateBatch onClose={handleCloseForm} />
      </Modal>
    </div>
  );
};

export default AddNewBatchTools;
