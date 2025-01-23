import React, { useState } from 'react';
import { Table, Tag } from 'antd';

const ToolTable = ({ tools, onToolRequest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
      sorter: (a, b) => a.ToolID - b.ToolID,
    },
    {
      title: 'Tool Name',
      dataIndex: 'ToolName',
      key: 'ToolName',
      sorter: (a, b) => a.ToolName.localeCompare(b.ToolName),
      filters: Array.from(new Set(tools.map(tool => tool.ToolName)))
        .map(toolName => ({ text: toolName, value: toolName })),
      filterSearch: true,
      onFilter: (value, record) => record.ToolName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Quantity',
      dataIndex: 'QuantityAvailable',
      key: 'QuantityAvailable',
      sorter: (a, b) => a.QuantityAvailable - b.QuantityAvailable,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (status) => (
        <Tag color={status === 'Available' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
      filters: Array.from(new Set(tools.map(tool => tool.Status)))
      .map(status => ({ text: status, value: status })),
    filterSearch: true,
    onFilter: (value, record) => record.ToolName.toLowerCase().includes(value.toLowerCase()),
  },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
      sorter: (a, b) => a.Location.localeCompare(b.Location),
      filters: Array.from(new Set(tools.map(tool => tool.Location)))
        .map(location => ({ text: location, value: location })),
      filterSearch: true,
      onFilter: (value, record) => record.Location.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Last Updated',
      dataIndex: 'LastUpdated',
      key: 'LastUpdated',
      render: date => new Date(date).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <button 
          onClick={() => onToolRequest(record)}
          className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          Request
        </button>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={tools}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: tools.length,
        onChange: (page) => setCurrentPage(page)
      }}
      rowKey="ToolID"
    />
  );
};

export default ToolTable;
