import React from 'react';
import { Card } from 'antd'; // Import Ant Design Card component
import DepartmentCard from '../../admin/cards/DepartmentCard';
import CategoryCard from '../../admin/cards/CategoryCard';
import ToolCard from '../../admin/cards/ToolCard';

const AddDataDashboard = () => {
  return (
    <>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <Card className="w-full md:w-1/2">
            <div className="overflow-x-auto">
              <DepartmentCard />
            </div>
          </Card>
          <Card className="w-full md:w-1/2">
            <div className="overflow-x-auto">
              <CategoryCard />
            </div>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <Card className="w-full mt-5">
            <div className="overflow-x-auto">
              <ToolCard />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddDataDashboard;
