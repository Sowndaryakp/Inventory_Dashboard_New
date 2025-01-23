import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Select, Input, Card } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const CreateToolRequest = ({ onClose }) => {
  const [userIDOptions, setUserIDOptions] = useState([]);
  const [toolIDOptions, setToolIDOptions] = useState([]);
  const [userID, setUserID] = useState(null);
  const [toolID, setToolID] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    fetchUserIDOptions();
    fetchToolIDOptions();
  }, []);

  const fetchUserIDOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8986/users');
      const options = response.data.map(user => (
        <Option key={user.UserID} value={user.UserID}>
          {`${user.UserName} (ID: ${user.UserID})`}
        </Option>
      ));
      setUserIDOptions(options);
    } catch (error) {
      console.error('Error fetching user options:', error);
    }
  };

  const fetchToolIDOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8986/tools');
      const tools = response.data.map(tool => (
        <Option key={tool.ToolID} value={tool.ToolID}>
          {`${tool.ToolName} (ID: ${tool.ToolID})`}
        </Option>
      ));
      setToolIDOptions(tools);
    } catch (error) {
      console.error('Error fetching tool options:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userID || !toolID || !quantity || !purpose) {
      setError('All fields are required');
      return;
    }

    try {
      const requestData = {
        UserID: userID,
        ToolID: toolID,
        QuantityNeeded: quantity,
        PurposeOfUse: purpose,
        AdditionalComments: comments,
        RequestDate: new Date().toISOString(),
        Status: 'Pending',
        AdminID: 0,
        AdminApprovalDate: new Date().toISOString(),
      };

      const response = await axios.post('http://localhost:8986/tool_requests/', requestData);
      console.log('Response:', response.data);
      setModalMessage('Tool request submitted successfully');
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
    setUserID(null);
    setToolID(null);
    setQuantity(0);
    setPurpose('');
    setComments('');
  };

  return (
    <Card style={{ width: 400 }}>
      <h3>Create Tool Request</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="userID" style={{ display: 'block', marginBottom: 8 }}>User ID</label>
          <Select
            id="userID"
            style={{ width: '100%' }}
            onChange={(value) => setUserID(value)}
            value={userID}
          >
            {userIDOptions}
          </Select>
        </div>
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
          <label htmlFor="quantity" style={{ display: 'block', marginBottom: 8 }}>Quantity Needed</label>
          <Input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="purpose" style={{ display: 'block', marginBottom: 8 }}>Purpose of Use</label>
          <Input
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="comments" style={{ display: 'block', marginBottom: 8 }}>Additional Comments</label>
          <TextArea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
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
      >
        <p>{modalMessage}</p>
      </Modal>
    </Card>
  );
};

export default CreateToolRequest;
