import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Card } from 'antd';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const categoriesPerPage = 5;

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8986/api/v1/categories/');
      setCategories(response.data);
      setTotalCategories(response.data.length);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (categoryID) => {
    console.log(`Edit category with ID: ${categoryID}`);
  };

  const handleDelete = (categoryID) => {
    console.log(`Delete category with ID: ${categoryID}`);
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'CategoryID',
      key: 'CategoryID',
    },
    {
      title: 'Category Name',
      dataIndex: 'CategoryName',
      key: 'CategoryName',
      filters: categories.map((cat) => ({ text: cat.CategoryName, value: cat.CategoryName })),
      onFilter: (value, record) => record.CategoryName.includes(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" onClick={() => handleEdit(record.CategoryID)} style={{ marginRight: '8px' }}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.CategoryID)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <div style={{ overflow: 'auto', maxWidth: '100%' }}>
      <Card className="shadow-md rounded-lg overflow-hidden" style={{ margin: '20px' }}>
      <h2 className="text-2xl text-center font-bold mt-1 mb-4">Total Categories</h2>
      <Table
          columns={columns}
          dataSource={currentCategories}
          rowKey="CategoryID"
          pagination={{
            current: currentPage,
            pageSize: categoriesPerPage,
            total: totalCategories,
            onChange: (page) => setCurrentPage(page),
          }}
          bordered
        />
      </Card>
    </div>
  );
};

export default CategoryTable;
