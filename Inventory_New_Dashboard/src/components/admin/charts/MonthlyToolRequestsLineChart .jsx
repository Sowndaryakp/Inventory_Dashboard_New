import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import ReactECharts from "echarts-for-react";

const MonthlyToolRequestsLineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyToolRequestTrends = async () => {
      try {
        const response = await fetch("http://localhost:8986/analytics/monthly_request_trends");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Assuming result is the array of data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchMonthlyToolRequestTrends();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin tip="Loading Monthly Tool Request Trends..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="w-3/4"
        />
      </div>
    );
  }

  // Prepare chart data
  const months = data.map((item) => item.month); // Extract months
  const totalRequests = data.map((item) => item.total_requests); // Extract total requests

  const chartOptions = {
    title: {
      text: "Monthly Tool Request Trends",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: months, // Use months as x-axis data
      axisLabel: {
        rotate: 45, // Rotate labels for better readability
      },
    },
    yAxis: {
      type: "value",
      name: "Total Requests",
    },
    series: [
      {
        data: totalRequests, // Use total requests as y-axis data
        type: "line",
        smooth: true,
        areaStyle: {}, // Adds the shaded area below the line
        color: "#4f46e5", // Customize line color
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ReactECharts option={chartOptions} style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default MonthlyToolRequestsLineChart;
