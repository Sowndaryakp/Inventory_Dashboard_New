import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, message, Modal, Input, Button } from 'antd';

const LocationTable = ({ refreshTable, onTableRefreshed }) => {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLocations, setTotalLocations] = useState(0);
  const [editingLocation, setEditingLocation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const locationsPerPage = 10;

  useEffect(() => {
    fetchLocations();
  }, [currentPage, refreshTable]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`http://localhost:8986/api/locations/?skip=${(currentPage - 1) * locationsPerPage}&limit=${locationsPerPage}`);
      setLocations(response.data);
      setTotalLocations(response.data.length);
      if (refreshTable) {
        onTableRefreshed();
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      message.error('Failed to fetch locations. Please try again later.');
    }
  };

  const handleEdit = async (locationID) => {
    try {
      const response = await axios.get(`http://localhost:8986/api/locations/${locationID}`);
      setEditingLocation(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching location details:', error);
      message.error('Failed to fetch location details. Please try again later.');
    }
  };

  const handleDelete = async (locationID) => {
    try {
      await axios.delete(`http://localhost:8986/api/locations/${locationID}`);
      message.success('Location deleted successfully');
      setLocations(locations.filter(location => location.LocationID !== locationID));
    } catch (error) {
      console.error('Error deleting location:', error);
      message.error('Failed to delete location. Please try again later.');
    }
  };

  const handleSave = async () => {
    if (!editingLocation) return;
    setLoading(true);
    try {
      await axios.put(`http://localhost:8986/api/locations/${editingLocation.LocationID}`, editingLocation);
      message.success('Location updated successfully');
      setIsEditing(false);
      fetchLocations();
    } catch (error) {
      console.error('Error updating location:', error);
      message.error('Failed to update location. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingLocation(null);
  };

  const columns = [
    {
      title: 'Location ID',
      dataIndex: 'LocationID',
      key: 'LocationID',
      sorter: (a, b) => a.LocationID - b.LocationID,
    },
    {
      title: 'Location Name',
      dataIndex: 'LocationName',
      key: 'LocationName',
      filters: Array.from(new Set(locations.map(location => location.LocationName))).map(LocationName => ({ text: LocationName, value: LocationName })),
      onFilter: (value, record) => record.LocationName.includes(value),
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      filters: Array.from(new Set(locations.map(location => location.Address))).map(Address => ({ text: Address, value: Address })),
      onFilter: (value, record) => record.Address.includes(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record.LocationID)} className="text-white hover:text-sky-500 bg-sky-600" style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDelete(record.LocationID)} type="danger">Delete</Button>
        </span>
      ),
    },
  ];

  const totalPages = Math.ceil(totalLocations / locationsPerPage);

  return (
    <div>
       <h2 className="text-2xl text-center font-bold mt-1 mb-4"> Location</h2>
      <Table
        columns={columns}
        dataSource={locations}
        rowKey="LocationID"
        bordered
        onChange={(pagination, filters, sorter, extra) => {
          console.log('params', pagination, filters, sorter, extra);
        }}
      />

      {isEditing && editingLocation && (
        <Modal
          visible={isEditing}
          title="Edit Location"
          onCancel={handleCancel}
          onOk={handleSave}
          confirmLoading={loading}
          okText="Save"
          cancelText="Cancel"
        >
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="locationName" style={{ display: 'block', marginBottom: 8 }}>Location Name</label>
            <Input
              id="locationName"
              value={editingLocation.LocationName}
              onChange={(e) => setEditingLocation({ ...editingLocation, LocationName: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: 8 }}>Address</label>
            <Input
              id="address"
              value={editingLocation.Address}
              onChange={(e) => setEditingLocation({ ...editingLocation, Address: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationTable;
