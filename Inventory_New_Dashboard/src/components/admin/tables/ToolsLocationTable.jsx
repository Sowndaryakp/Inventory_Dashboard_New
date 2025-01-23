import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Table, message, Modal, Input, Button } from 'antd';

const LocationTable = ({ refreshTable, onTableRefreshed }) => {
  const [toolLocations, setToolLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalToolLocations, setTotalToolLocations] = useState(0);
  const [editingToolLocation, setEditingToolLocation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const toolLocationsPerPage = 10;

  useEffect(() => {
    fetchToolLocations();
  }, [currentPage, refreshTable]);

  const fetchToolLocations = async () => {
    try {
      const response = await axios.get(`http://localhost:8986/api/tool-locations/?skip=${(currentPage - 1) * toolLocationsPerPage}&limit=${toolLocationsPerPage}`);
      setToolLocations(response.data);
      setTotalToolLocations(response.data.length);
      if (refreshTable) {
        onTableRefreshed();
      }
    } catch (error) {
      console.error('Error fetching tool locations:', error);
      message.error({
        content: 'Failed to fetch tool locations. Please try again later.',
        style: { marginTop: '20vh' },
      });
    }
  };

  const handleEdit = async (toolLocationID, quantity) => {
    try {
      const response = await axios.get(`http://localhost:8986/api/tool-locations/${toolLocationID}?quantity=${quantity}`);
      setEditingToolLocation(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching tool location details:', error);
      message.error({
        content: 'Failed to fetch tool location details. Please try again later.',
        style: { marginTop: '20vh' },
      });
    }
  };

  const handleDelete = async (toolLocationID) => {
    try {
      await axios.delete(`http://localhost:8986/api/tool-locations/${toolLocationID}`);
      message.success({
        content: 'Tool location deleted successfully',
        style: { marginTop: '20px', top: 0, right: 0 },
      });
      setToolLocations(toolLocations.filter(toolLocation => toolLocation.ToolLocationID !== toolLocationID));
    } catch (error) {
      console.error('Error deleting tool location:', error);
      message.error({
        content: 'Failed to delete tool location. Please try again later.',
        style: { marginTop: '20vh' },
      });
    }
  };

  const handleSave = async () => {
    if (!editingToolLocation) return;
    setLoading(true);
    try {
      await axios.put(`http://localhost:8986/api/tool-locations/${editingToolLocation.ToolLocationID}`, editingToolLocation);
      message.success({
        content: 'Tool location updated successfully',
        style: { marginTop: '20vh' },
      });
      setIsEditing(false);
      fetchToolLocations();
    } catch (error) {
      console.error('Error updating tool location:', error);
      message.error({
        content: 'Failed to update tool location. Please try again later.',
        style: { marginTop: '20vh' },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingToolLocation(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Tool Location ID',
      dataIndex: 'ToolLocationID',
      key: 'ToolLocationID',
      sorter: (a, b) => a.ToolLocationID - b.ToolLocationID,
    },
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
      sorter: (a, b) => a.ToolID - b.ToolID,
    },
    {
      title: 'Location ID',
      dataIndex: 'LocationID',
      key: 'LocationID',
      sorter: (a, b) => a.LocationID - b.LocationID,
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      sorter: (a, b) => a.Quantity - b.Quantity,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record.ToolLocationID, record.Quantity)} className="mr-2 mb-2">Edit</Button>
          <Button onClick={() => handleDelete(record.ToolLocationID)} className="mr-2">Delete</Button>
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const totalPages = Math.ceil(totalToolLocations / toolLocationsPerPage);

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mt-1 mb-4">Tools Location</h2>
      <Table
        columns={columns}
        dataSource={toolLocations}
        rowKey="ToolLocationID"
        bordered
        onChange={onChange}
      />

      {isEditing && editingToolLocation && (
        <Modal
          visible={isEditing}
          title="Edit Tool Location"
          onCancel={handleCancel}
          onOk={handleSave}
          confirmLoading={loading}
        >
          <div className="mb-4">
            <label htmlFor="toolID" className="block text-sm font-medium text-gray-700">Tool ID</label>
            <Input
              id="toolID"
              value={editingToolLocation.ToolID}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, ToolID: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="locationID" className="block text-sm font-medium text-gray-700">Location ID</label>
            <Input
              id="locationID"
              value={editingToolLocation.LocationID}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, LocationID: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <Input
              id="quantity"
              value={editingToolLocation.Quantity}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, Quantity: parseInt(e.target.value) })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationTable;
