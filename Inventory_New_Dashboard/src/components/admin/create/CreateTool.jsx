import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, notification } from 'antd'; // Ant Design components

const CreateTool = ({ onClose, onToolAdded }) => {
  const [toolName, setToolName] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [status, setStatus] = useState('Available');
  const [location, setLocation] = useState('');
  const [categoryID, setCategoryID] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toolName || quantityAvailable <= 0 || !status || !location || categoryID <= 0) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8986/tools/', {
        ToolName: toolName,
        QuantityAvailable: quantityAvailable,
        Status: status,
        Location: location,
        CategoryID: categoryID
      });
      console.log('Response:', response.data);
      onToolAdded(); // Notify parent component to refresh the table
      onClose();
      notification.success({ message: 'Tool created successfully' });
    } catch (err) {
      console.error('Error submitting request:', err);
      if (err.response && err.response.data) {
        setError(`Error: ${err.response.data.detail}`);
        notification.error({ message: `Error: ${err.response.data.detail}` });
      } else {
        setError('An unexpected error occurred');
        notification.error({ message: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <Card title="Create Tool" style={{ width: 350 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Tool Name">
          <Input
            type="text"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Quantity Available">
          <Input
            type="number"
            value={quantityAvailable}
            onChange={(e) => setQuantityAvailable(parseInt(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Location">
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Category ID">
          <Input
            type="number"
            value={categoryID}
            onChange={(e) => setCategoryID(parseInt(e.target.value))}
          />
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="default" onClick={onClose} style={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateTool;
