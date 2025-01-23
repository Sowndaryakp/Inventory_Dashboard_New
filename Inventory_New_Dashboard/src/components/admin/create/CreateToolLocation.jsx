import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Select, Input, Card } from 'antd';
const { Option } = Select;

const CreateToolLocationRequest = ({ onClose }) => {
  const [toolIDOptions, setToolOptions] = useState([]);
  const [locationIDOptions, setLocationIDOptions] = useState([]);
  const [toolID, setToolID] = useState(null);
  const [locationID, setLocationID] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchToolIDOptions();
    fetchLocationIDOptions();
  }, []);

  const fetchToolIDOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8986/tools');
      const tools = response.data;
      const options = tools.map(tool => (
        <Option key={tool.ToolID} value={tool.ToolID}>
          {`${tool.ToolName} (ID: ${tool.ToolID})`}
        </Option>
      ));
      setToolOptions(options);
    } catch (error) {
      console.error('Error fetching tool options:', error);
    }
  };

  const fetchLocationIDOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8986/api/tool-locations/?skip=0&limit=10');
      const options = response.data.map(location => (
        <Option key={location.LocationID} value={location.LocationID}>
          {`${location.LocationID}`}
        </Option>
      ));
      setLocationIDOptions(options);
    } catch (error) {
      console.error('Error fetching location IDs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toolID || !locationID || !quantity) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8986/api/tool-locations/', {
        ToolID: toolID,
        LocationID: locationID,
        Quantity: quantity,
      });
      console.log('Response:', response.data);
      setModalMessage('Tool location added successfully');
      setSuccessModalVisible(true);
      onClose();
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Error submitting request');
    }
  };

  const handleModalOk = () => {
    setSuccessModalVisible(false);
    setModalMessage('');
    setToolID(null);
    setLocationID(null);
    setQuantity(0);
  };

  const handleModalCancel = () => {
    setSuccessModalVisible(false);
    setModalMessage('');
  };

  return (
    <Card style={{ width: 350 }}>
      <h3>Create New Tool Location</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="toolID" style={{ display: 'block', marginBottom: 8 }}>Tool ID</label>
          <Select
            id="toolID"
            style={{ width: '100%' }}
            onChange={(value) => setToolID(value)}
            value={toolID}
          >
            {toolIDOptions}
          </Select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="locationID" style={{ display: 'block', marginBottom: 8 }}>Location ID</label>
          <Select
            id="locationID"
            style={{ width: '100%' }}
            onChange={(value) => setLocationID(value)}
            value={locationID}
          >
            {locationIDOptions}
          </Select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="quantity" style={{ display: 'block', marginBottom: 8 }}>Quantity</label>
          <Input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <Button type="default" onClick={onClose}>Cancel</Button>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" htmlType="submit">Submit</Button>
        </div>
      </form>

      <Modal
        title="Success"
        visible={successModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
    </Card>
  );
};

export default CreateToolLocationRequest;
