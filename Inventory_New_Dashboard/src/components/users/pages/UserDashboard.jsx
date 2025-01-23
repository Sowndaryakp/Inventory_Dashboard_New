import React, { useEffect, useState } from "react";
import TotalToolsCard from '../../allcards/TotalTools';

const ToolTable = () => {


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
      <div className="md:w-1/4">
          <TotalToolsCard />
        </div>
      </div>



      
    </div>
  );
};

export default ToolTable;
