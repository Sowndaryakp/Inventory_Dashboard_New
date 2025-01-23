import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'antd';

const BatchTable = ({ refreshTable, onTableRefreshed }) => {
  const [tools, setTools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 7;

  useEffect(() => {
    fetchTools();
  }, [currentPage, refreshTable]);

  const fetchTools = async () => {
    try {
      const response = await axios.get(`http://localhost:8986/api/?skip=${(currentPage - 1) * toolsPerPage}&limit=${toolsPerPage}`);
      setTools(response.data);
      if (refreshTable) {
        onTableRefreshed();
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleEdit = (toolID) => {
    console.log(`Edit tool with ID: ${toolID}`);
  };

  const handleDelete = (toolID) => {
    console.log(`Delete tool with ID: ${toolID}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
      sorter: (a, b) => a.ToolID - b.ToolID,
    },
    {
      title: 'Batch Number',
      dataIndex: 'BatchNumber',
      key: 'BatchNumber',
      filters: Array.from(new Set(tools.map(tool => tool.BatchNumber))).map(batchNumber => ({ text: batchNumber, value: batchNumber })),
      onFilter: (value, record) => record.BatchNumber.includes(value),
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'ManufactureDate',
      key: 'ManufactureDate',
      sorter: (a, b) => new Date(a.ManufactureDate).getTime() - new Date(b.ManufactureDate).getTime(),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'ExpiryDate',
      key: 'ExpiryDate',
      sorter: (a, b) => new Date(a.ExpiryDate).getTime() - new Date(b.ExpiryDate).getTime(),
    },
    {
      title: 'Batch ID',
      dataIndex: 'BatchID',
      key: 'BatchID',
      sorter: (a, b) => a.BatchID - b.BatchID,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record.ToolID)} className="text-white hover:text-sky-500 bg-sky-600 w-full mr-2 mb-2">Edit</Button>
          <Button onClick={() => handleDelete(record.ToolID)} className="text-white hover:text-sky-500 bg-sky-600 w-full mr-2" type="danger">Delete</Button>
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const totalPages = Math.ceil(tools.length / toolsPerPage);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tools}
        rowKey="ToolID"
        onChange={onChange}
        bordered
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={tools.length}
        pageSize={toolsPerPage}
        onChange={paginate}
        showSizeChanger={false}
        style={{ marginTop: '16px' }}
      />
    </div>
  );
};

export default BatchTable;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Pagination, Spin } from 'antd';

// const BatchTable = ({ refreshTable, onTableRefreshed }) => {
//   const [tools, setTools] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const toolsPerPage = 8;

//   useEffect(() => {
//     fetchTools();
//   }, [currentPage, refreshTable]);

//   const fetchTools = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:8986/api/?skip=${(currentPage - 1) * toolsPerPage}&limit=${toolsPerPage}`);
//       setTools(response.data);
//       if (refreshTable) {
//         onTableRefreshed();
//       }
//     } catch (error) {
//       console.error('Error fetching tools:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (toolID) => {
//     console.log(`Edit tool with ID: ${toolID}`);
//   };

//   const handleDelete = (toolID) => {
//     console.log(`Delete tool with ID: ${toolID}`);
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const columns = [
//     {
//       title: 'Tool ID',
//       dataIndex: 'ToolID',
//       key: 'ToolID',
//       sorter: (a, b) => a.ToolID - b.ToolID,
//     },
//     {
//       title: 'Batch Number',
//       dataIndex: 'BatchNumber',
//       key: 'BatchNumber',
//       filters: Array.from(new Set(tools.map(tool => tool.BatchNumber)))
//         .map(batchNumber => ({ text: batchNumber, value: batchNumber })),
//       onFilter: (value, record) => record.BatchNumber.includes(value),
//     },
//     {
//       title: 'Manufacture Date',
//       dataIndex: 'ManufactureDate',
//       key: 'ManufactureDate',
//       sorter: (a, b) => new Date(a.ManufactureDate).getTime() - new Date(b.ManufactureDate).getTime(),
//     },
//     {
//       title: 'Expiry Date',
//       dataIndex: 'ExpiryDate',
//       key: 'ExpiryDate',
//       sorter: (a, b) => new Date(a.ExpiryDate).getTime() - new Date(b.ExpiryDate).getTime(),
//     },
//     {
//       title: 'Batch ID',
//       dataIndex: 'BatchID',
//       key: 'BatchID',
//       sorter: (a, b) => a.BatchID - b.BatchID,
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button onClick={() => handleEdit(record.ToolID)} className="mr-2 mb-2" type="primary">Edit</Button>
//           <Button onClick={() => handleDelete(record.ToolID)} className="mr-2" type="danger">Delete</Button>
//         </span>
//       ),
//     },
//   ];

//   const totalItems = 100; // Replace this with a dynamic value if available from API response (e.g., total count)

//   return (
//     <div>
//       {loading ? (
//         <Spin tip="Loading..." style={{ display: 'block', margin: '20px 0' }} />
//       ) : (
//         <>
//           <Table
//             columns={columns}
//             dataSource={tools}
//             rowKey="ToolID"
//             bordered
//             pagination={false}
//           />
//           <Pagination
//             current={currentPage}
//             total={totalItems}
//             pageSize={toolsPerPage}
//             onChange={paginate}
//             showSizeChanger={false}
//             style={{ marginTop: '16px' }}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default BatchTable;

