import React, { useState } from 'react';
import axios from 'axios';
import { Card, notification } from 'antd'; // Import Ant Design components
import { Button, Input, Form } from 'antd'; // Import Ant Design components

const CreateDepartment = ({ onClose, onDepartmentAdded }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8986/departments/', { Name: name });
      console.log('Response:', response.data);
      
      // Show success notification
      notification.success({
        message: 'Department Created',
        description: 'The department has been successfully created.',
        placement: 'topRight',
      });

      onDepartmentAdded(); // Trigger callback after adding a department
      onClose(); // Close the form
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Error submitting request');

      // Show error notification
      notification.error({
        message: 'Error',
        description: 'There was an error creating the department. Please try again.',
        placement: 'topRight',
      });
    }
  };

  return (
    <Card title="Create Department" style={{ width: 350 }}>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" required>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default CreateDepartment;
