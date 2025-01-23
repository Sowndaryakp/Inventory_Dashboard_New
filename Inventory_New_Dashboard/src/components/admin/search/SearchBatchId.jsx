import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button, Table, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBatchId = () => {
  const [batchID, setBatchID] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!batchID) {
      setError('Batch ID is required');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8986/api/${batchID}`);
      setBatchDetails(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching batch details:', err);
      setError('Error fetching batch details');
      setBatchDetails(null);
      notification.error({
        message: 'Error',
        description: 'Error fetching batch details. Please try again later.',
      });
    }
  };

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
    },
    {
      title: 'Batch Number',
      dataIndex: 'BatchNumber',
      key: 'BatchNumber',
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'ManufactureDate',
      key: 'ManufactureDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'ExpiryDate',
      key: 'ExpiryDate',
    },
    {
      title: 'Batch ID',
      dataIndex: 'BatchID',
      key: 'BatchID',
    },
  ];

  return (
    <Card className="w-auto mx-auto">
      <div className="p-4">
        <div className="mt-2 flex items-center">
          <label htmlFor="batchID" className="block text-base font-medium text-gray-700 mr-2">Batch ID</label>
          <div className="relative flex-grow">
            <Input
              type="text"
              id="batchID"
              value={batchID}
              onChange={(e) => setBatchID(e.target.value)}
              className="mt-1 w-full"
              prefix={<SearchOutlined />}
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button onClick={handleSearch}  className="text-white hover:text-sky-500 bg-sky-600 ml-4 mt-4">
            Search
          </Button>
        </div>
      </div>
      {batchDetails && (
        <div className="overflow-x-auto p-4">
          <Table
            columns={columns}
            dataSource={[batchDetails]}
            rowKey="BatchID"
            bordered
            pagination={false}
            className="w-full"
          />
        </div>
      )}
    </Card>
  );
};

export default SearchBatchId;
