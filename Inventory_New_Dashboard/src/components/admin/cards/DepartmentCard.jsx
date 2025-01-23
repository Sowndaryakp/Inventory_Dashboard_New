import React, { useState } from 'react';
import { Button } from 'antd'; // Import Ant Design Button component
import CreateDepartment from '../../admin/create/CreateDepartment';
import DepartmentTable from '../../admin/tables/DepartmentTable'; // Import the DepartmentTable component

const DepartmentCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh

  const handleAddDepartment = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDepartmentAdded = () => {
    // Set refreshTable to true to trigger table refresh
    setRefreshTable(true);
  };

  // Function to reset refreshTable state after table refresh
  const handleTableRefreshed = () => {
    setRefreshTable(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button onClick={handleAddDepartment} className="text-white hover:text-sky-500 bg-sky-600 mt-4">
        Add Department
      </Button>
      {/* Conditionally render the CreateDepartment component as a modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseForm}></div>
          <div className="relative z-10 bg-white p-4 rounded-lg">
            {/* Pass handleDepartmentAdded as a prop to CreateDepartment */}
            <CreateDepartment onClose={handleCloseForm} onDepartmentAdded={handleDepartmentAdded} />
          </div>
        </div>
      )}
      
      {/* Render the DepartmentTable component */}
      <div className="mt-4">
        {/* Pass refreshTable and handleTableRefreshed as props to DepartmentTable */}
        <DepartmentTable refreshTable={refreshTable} onTableRefreshed={handleTableRefreshed} />
      </div>
    </div>
  );
};

export default DepartmentCard;
