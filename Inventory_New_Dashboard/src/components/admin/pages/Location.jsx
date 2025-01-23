import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationTable from '../../admin/tables/LocationTable';
import ToolsLocationTable from '../../admin/tables/ToolsLocationTable';
// import SearchLocationId from '../components/tables/SearchLocationId';
import AddNewLocationTools from '../../admin/Add/AddNewLocationTools';
import AddNewToolLocations from '../../admin/Add/AddNewToolLocations';
import AddNewToolRequest from '../../admin/Add/AddNewToolRequest';
import { Card } from 'antd';

const Location = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('url');
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRequestClick = async (toolID) => {
    // Your handleRequestClick logic here
    console.log("tool id", toolID);
    console.log("tClicked");
  };

  return (
    <>
      <div className="p-3">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div>
            <AddNewLocationTools />
          </div>
          <div>
            <AddNewToolLocations />
          </div>
          {/* <div>
            <AddNewToolRequest />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-2/4">
          <div className="overflow-x-auto">
            <LocationTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
        <Card className="w-full md:w-1/2">
          <ToolsLocationTable tools={tools} onRequestClick={handleRequestClick} />
        </Card>
      </div>
    </>
  );
};

export default Location;
