import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button , Card} from 'antd';
import TotalRequests from '../../admin/cards/TotalRequests';
import PendingRequests from '../../admin/cards/PendingRequests';
import ApprovedRequests from '../../admin/cards/ApprovedRequests';
import RejectedRequests from '../../admin/cards/RejectedRequests';

const ApproveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const [requestsPerPage] = useState(10);
  const [filteredInfo, setFilteredInfo] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [currentPage]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8986/request_details');
      setTotalRequests(response.data.length);
      const startIndex = (currentPage - 1) * requestsPerPage;
      const endIndex = startIndex + requestsPerPage;
      setRequests(response.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axios.put(`http://localhost:8986/tool_requests/${requestId}/approve`);
      // Update the status locally after approval
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.RequestID === requestId ? { ...request, Status: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'RequestID',
      sorter: (a, b) => a.RequestID - b.RequestID,
    },
    {
      title: 'User ID',
      dataIndex: 'UserID',
      sorter: (a, b) => a.UserID - b.UserID,
    },
    {
      title: 'User Name',
      dataIndex: 'UserName',
      filters: Array.from(new Set(requests.map(request => request.UserName))).map(userName => ({ text: userName, value: userName })),
      filterSearch: true,
      onFilter: (value, record) => record.UserName.includes(value),
    },
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      sorter: (a, b) => a.ToolID - b.ToolID,
    },
    {
      title: 'Tool Name',
      dataIndex: 'ToolName',
      filters: Array.from(new Set(requests.map(request => request.ToolName))).map(toolName => ({ text: toolName, value: toolName })),
      filterSearch: true,
      onFilter: (value, record) => record.ToolName.includes(value),
    },
    {
      title: 'Quantity Needed',
      dataIndex: 'QuantityNeeded',
      sorter: (a, b) => a.QuantityNeeded - b.QuantityNeeded,
    },
    {
      title: 'Purpose of Use',
      dataIndex: 'PurposeOfUse',
    },
    {
      title: 'Additional Comments',
      dataIndex: 'AdditionalComments',
    },
    {
      title: 'Request Date',
      dataIndex: 'RequestDate',
      render: date => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.RequestDate).getTime() - new Date(b.RequestDate).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      filters: Array.from(new Set(requests.map(request => request.Status))).map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.Status.includes(value),
      render: (status, record) => (
        status === 'Approved' ? (
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            Approved
          </div>
        ) : (
          <Button
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => handleApprove(record.RequestID)}
          >
            Pending
          </Button>
        )
      ),
    },
  ];

  return (
    <div className="overflow-auto max-w-full">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div>
          <TotalRequests />
        </div>
        <div>
          <PendingRequests />
        </div>
        <div>
          <ApprovedRequests />
        </div>
        <div>
          <RejectedRequests />
        </div>
      </div>

      <Card className="shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={requests}
            pagination={{
              current: currentPage,
              pageSize: requestsPerPage,
              total: totalRequests,
              onChange: (page) => setCurrentPage(page),
            }}
            onChange={handleChange}
            bordered
            rowKey="RequestID"
          />
        </div>
      </Card>
    </div>
  );
};

export default ApproveRequests;
