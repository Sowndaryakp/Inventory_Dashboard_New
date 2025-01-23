import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Card, Pagination } from 'antd';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const departmentsPerPage = 5; // Number of departments per page

  useEffect(() => {
    fetchDepartments();
  }, []); // Fetch departments once on component mount

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8986/departments/');
      setDepartments(response.data);
      setTotalDepartments(response.data.length); // Set total number of departments
    } catch (error) {
      console.error('Error fetching departments:', error);
      // Handle error if needed
    }
  };

  const handleEdit = (depID) => {
    // Implement edit functionality
    console.log(`Edit department with ID: ${depID}`);
  };

  const handleDelete = async (depID) => {
    try {
      // Implement delete functionality
      await axios.delete(`http://localhost:8986/departments/${depID}`);
      // Fetch departments after successful deletion
      fetchDepartments();
    } catch (error) {
      console.error(`Error deleting department with ID ${depID}:`, error);
      // Handle error if needed
    }
  };

  const columns = [
    {
      title: 'Department ID',
      dataIndex: 'DepID',
      key: 'DepID',
    },
    {
      title: 'Department Name',
      dataIndex: 'Name',
      key: 'Name',
      filters: departments.map((dept) => ({ text: dept.Name, value: dept.Name })),
      onFilter: (value, record) => record.Name.includes(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record.DepID)} className="text-white hover:text-sky-500 bg-sky-600 mr-2">Edit</Button>
          <Button onClick={() => handleDelete(record.DepID)} type="danger">Delete</Button>
        </span>
      ),
    },
  ];

  // Calculate the current page data
  const currentData = departments.slice(
    (currentPage - 1) * departmentsPerPage,
    currentPage * departmentsPerPage
  );

  return (
    <div className="overflow-auto max-w-full">
      <Card className="shadow-md rounded-lg overflow-hidden ml-5">
        <h2 className="text-2xl text-center font-bold mt-1 mb-4">Total Departments</h2>
        <Table
          columns={columns}
          dataSource={currentData}
          rowKey="DepID"
          pagination={false} // Disable built-in pagination so we can use the custom one
          bordered
        />
        {/* Custom Pagination */}
        <Pagination
          current={currentPage}
          pageSize={departmentsPerPage}
          total={totalDepartments}
          onChange={(page) => setCurrentPage(page)}
          style={{ margin: '16px 0', textAlign: 'right' }}
        />
      </Card>
    </div>
  );
};

export default DepartmentTable;
