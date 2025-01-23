import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, notification } from 'antd';

const CreateCategory = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [parentID, setParentID] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    if (!values.categoryName) {
      notification.error({
        message: 'Validation Error',
        description: 'Category Name is required',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8986/api/v1/categories/', {
        CategoryName: values.categoryName,
        ParentID: values.parentID,
      });
      console.log('Response:', response.data);
      notification.success({
        message: 'Success',
        description: 'Category created successfully',
      });
      onClose();
    } catch (err) {
      console.error('Error submitting request:', err);
      notification.error({
        message: 'Submission Error',
        description: 'Error submitting request',
      });
    }
  };

  return (
    <Modal
      title="Create Category"
      visible={true}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: 'Category Name is required' }]}
        >
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Parent ID (optional)" name="parentID">
          <Input
            type="number"
            value={parentID !== null ? parentID : ''}
            onChange={(e) => setParentID(e.target.value ? parseInt(e.target.value) : null)}
          />
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            Cancel
          </Button>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
