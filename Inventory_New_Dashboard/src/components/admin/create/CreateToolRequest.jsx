import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, notification } from 'antd';

const CreateAddNewToolRequest = ({ onClose }) => {
  const [userId, setUserId] = useState('');
  const [parentID, setParentID] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    if (!values.userId) {
      setError('User ID is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8986/api/v1/categories/', {
        userId: values.userId,
        ParentID: values.parentID,
      });
      console.log('Response:', response.data);
      notification.success({ message: 'Request submitted successfully' });
      onClose();
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Error submitting request');
      notification.error({ message: 'Error submitting request', description: 'Please try again later.' });
    }
  };

  return (
    <Card title="Create Add New Tool Request" style={{ width: 350 }}>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="User ID"
          name="userId"
          rules={[{ required: true, message: 'User ID is required' }]}
        >
          <Input value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Form.Item>

        <Form.Item label="Parent ID (optional)" name="parentID">
          <Input
            type="number"
            value={parentID !== null ? parentID : ''}
            onChange={(e) => setParentID(e.target.value ? parseInt(e.target.value, 10) : null)}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <Button type="default" onClick={onClose}>
            Cancel
          </Button>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CreateAddNewToolRequest;
