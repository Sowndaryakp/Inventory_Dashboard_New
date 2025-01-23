import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Card, Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const ToolTable = ({ refreshTable, onTableRefreshed }) => {
  const [tools, setTools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTools, setTotalTools] = useState(0);
  const toolsPerPage = 5;
  const [filteredInfo, setFilteredInfo] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTools();
  }, [currentPage, refreshTable]);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:8986/tools');
      setTools(response.data);
      setTotalTools(response.data.length);
      if (refreshTable) {
        onTableRefreshed();
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleEdit = (tool) => {
    setEditingTool(tool);
    form.setFieldsValue(tool);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedData = await form.validateFields();
      const updatedTool = {
        ...updatedData,
        LastUpdated: new Date().toISOString(), // Add the current date in ISO format
      };
      await axios.put(`http://localhost:8986/tools/${editingTool.ToolID}`, updatedTool);
      message.success('Tool updated successfully!');
      fetchTools();
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating tool:', error);
      message.error('Failed to update tool.');
    }
  };
  

  const handleDelete = async (toolID) => {
    try {
      await axios.delete(`http://localhost:8986/tools/${toolID}`);
      message.success('Tool deleted successfully!');
      fetchTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
      message.error('Failed to delete tool.');
    }
  };

  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
    },
    {
      title: 'Tool Name',
      dataIndex: 'ToolName',
      key: 'ToolName',
      filters: tools.map((tool) => ({ text: tool.ToolName, value: tool.ToolName })),
      onFilter: (value, record) => record.ToolName.includes(value),
    },
    {
      title: 'Quantity Available',
      dataIndex: 'QuantityAvailable',
      key: 'QuantityAvailable',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },
    {
      title: 'Category ID',
      dataIndex: 'CategoryID',
      key: 'CategoryID',
    },
    {
      title: 'EPC',
      dataIndex: 'EPC',
      key: 'EPC',
    },
    {
      title: 'Last Updated',
      dataIndex: 'LastUpdated',
      key: 'LastUpdated',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button  onClick={() => handleEdit(record)} className="mr-2 text-white hover:text-sky-500 bg-sky-600" >
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.ToolID)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-auto max-w-full">
      <Card className="shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl text-center font-bold mt-1 mb-4">Total Tools</h2>
        <Table
          columns={columns}
          dataSource={tools.slice(
            (currentPage - 1) * toolsPerPage,
            currentPage * toolsPerPage
          )}
          rowKey="ToolID"
          pagination={{
            current: currentPage,
            pageSize: toolsPerPage,
            total: totalTools,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={handleChange}
          bordered
        />
      </Card>

      <Modal
        title="Edit Tool"
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="QuantityAvailable"
            label="Quantity Available"
            rules={[{ required: true, message: 'Please enter the quantity available' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="Status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Select>
              <Option value="In Use">In Use</Option>
              <Option value="Available">Available</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Location"
            label="Location"
            rules={[{ required: true, message: 'Please enter the location' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CategoryID"
            label="Category ID"
            rules={[{ required: true, message: 'Please enter the category ID' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="EPC"
            label="EPC"
            rules={[{ required: true, message: 'Please enter the EPC' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ToolTable;
