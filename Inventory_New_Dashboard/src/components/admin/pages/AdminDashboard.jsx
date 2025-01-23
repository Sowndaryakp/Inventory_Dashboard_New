import React from 'react';
import TotalToolsHomeBoxCard from '../../allcards/TotalTools';
import ToolsInUseHomeBoxCard from '../../allcards/ToolsInUse';
import ToolsAvailable from '../../allcards/ToolsAvailable';
import MonthlyToolRequestsLineChart from '../charts/MonthlyToolRequestsLineChart '
import RequestStatusDistributionChart from '../charts/RequestStatusDistributionChart '
import ToolAvailabilityAndUsageChart from '../charts/ToolAvailabilityAndUsageChart ';
import ToolTable from '../tables/ToolTable';
import MostRequestedToolsChart from '../charts/MostRequestedToolsChart ';
import RequestsByDepartmentChart from '../charts/RequestsByDepartmentChart ';

const AdminDashboard = () => {
    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/5">
                    <TotalToolsHomeBoxCard />
                </div>
                <div className="md:w-1/5">
                    <ToolsInUseHomeBoxCard />
                </div>
                <div className="md:w-1/5">
                    <ToolsAvailable/>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <div className="md:w-1/2">
                    <MonthlyToolRequestsLineChart />
                </div>
                <div className="md:w-1/4">
                    <RequestStatusDistributionChart />
                </div>
                <div className="md:w-1/4">
                    <ToolAvailabilityAndUsageChart />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <div className="md:w-1/2">
                    <MostRequestedToolsChart />
                </div>
                <div className="md:w-1/2">
                   {/* <ToolTable /> */}
                   <RequestsByDepartmentChart />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <div className="">
                   <ToolTable />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;