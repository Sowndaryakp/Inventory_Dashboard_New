import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import ReactECharts from "echarts-for-react";

const ToolAvailabilityAndUsageChart = () => {
  const [data, setData] = useState({ available: 0, in_use: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToolAvailabilityAndUsage = async () => {
      try {
        const response = await fetch("http://localhost:8986/analytics/tool_availability_and_usage");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Assuming result contains 'available' and 'in_use' values
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchToolAvailabilityAndUsage();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin tip="Loading Tool Availability and Usage..." />
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
  const chartData = [
    {
      value: data.available,
      name: "Available",
      itemStyle: {
        color: "rgb(84,112,198)", // Green for Available
      },
    },
    {
      value: data.in_use,
      name: "In Use",
      itemStyle: {
        color: "rgb(145,204,117)", // Red for In Use
      },
    },
  ];

  const chartOptions = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Tool Status",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-5">
        Tool Availability and Usage
      </h2>
      <ReactECharts option={chartOptions} style={{ height: "350px", width: "100%" }} />
    </div>
  );
};

export default ToolAvailabilityAndUsageChart;
