import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const RequestToolCard = ({ tool = {}, onClose }) => {
  const [userID, setUserID] = useState();
  const [quantityNeeded, setQuantityNeeded] = useState();
  const [purposeOfUse, setPurposeOfUse] = useState('');
  const [comments, setComments] = useState('');
  const requestDate = new Date().toISOString();

  const handleSubmit = async () => {
    if (!userID || !quantityNeeded) {
      message.error('Please fill all required fields');
      return;
    }

    if (quantityNeeded > (tool.QuantityAvailable || 0)) {
      message.error('Requested quantity exceeds available tools');
      return;
    }

    try {
      const requestData = {
        UserID: userID,
        ToolID: tool.ToolID,
        QuantityNeeded: quantityNeeded,
        PurposeOfUse: purposeOfUse,
        AdditionalComments: comments,
        RequestDate: requestDate,
        Status: 'Pending'
      };

      await axios.post('http://localhost:8986/tool_requests', requestData);
      message.success('Tool request submitted successfully');
      onClose();
    } catch (error) {
      message.error('Failed to submit tool request');
      console.error('Request submission error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4">
        {tool.ToolName ? `Request Tool: ${tool.ToolName}` : 'Request a Tool'}
      </h2>
      <div className="space-y-4">
        {tool.ToolID && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tool ID</label>
            <input 
              type="text" 
              value={tool.ToolID || ''} 
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Request Date</label>
          <input 
            type="text" 
            value={new Date(requestDate).toLocaleString()} 
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input 
            type="number" 
            value={userID || ''} 
            onChange={(e) => setUserID(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity Needed</label>
          <input 
            type="number" 
            value={quantityNeeded || ''} 
            onChange={(e) => setQuantityNeeded(Number(e.target.value))}
            max={tool.QuantityAvailable || 0}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose of Use</label>
          <input 
            type="text" 
            value={purposeOfUse} 
            onChange={(e) => setPurposeOfUse(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
          <textarea 
            value={comments} 
            onChange={(e) => setComments(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <button 
          onClick={onClose} 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default RequestToolCard;