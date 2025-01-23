import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Typography, Modal } from 'antd';

const { Title } = Typography;

const CreateLocationRequest = ({ onClose }) => {
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8986/api/locations/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationName || !address) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8986/api/locations/', {
        LocationName: locationName,
        Address: address,
      });
      console.log('Response:', response.data);
      
      // Show modal on successful submission
      setIsModalVisible(true);
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Error submitting request');
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    onClose(); // Close the form after modal is closed
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card style={{ width: 350 }}>
      <Title level={4}>Create New Location Request</Title>
      <Form onSubmitCapture={handleSubmit}>
        <Form.Item label="Location Name">
          <Input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Address">
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="default" onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Modal for success message */}
      <Modal
        title="Success"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="ok" className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <p>Your location request has been submitted successfully!</p>
      </Modal>
    </Card>
  );
};

export default CreateLocationRequest;
