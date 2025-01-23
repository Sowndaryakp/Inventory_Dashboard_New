import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "antd";
import BatchTable from "../../admin/tables/BatchTable";
import SearchBatchId from "../../admin/search/SearchBatchId";
import AddNewBatchTools from "../../admin/Add/AddNewBatchTools";

const Batch = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("url");
      setTools(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRequestClick = (toolID) => {
    console.log("Tool ID clicked:", toolID);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <AddNewBatchTools />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
        <Card title="Batch Table" className="w-full md:w-2/4">
          <div className="overflow-x-auto">
            <BatchTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
        <Card title="Search Batch ID" className="w-full md:w-1/2">
          <SearchBatchId />
        </Card>
      </div>
    </div>
  );
};

export default Batch;