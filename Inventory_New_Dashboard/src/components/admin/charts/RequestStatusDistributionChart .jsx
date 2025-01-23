import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import ReactECharts from "echarts-for-react";

const RequestStatusDistributionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestStatusDistribution = async () => {
      try {
        const response = await fetch("http://localhost:8986/analytics/request_status_distribution");
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

    fetchRequestStatusDistribution();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin tip="Loading Request Status Distribution..." />
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
  const chartData = data.map((item) => ({
    value: item.count,
    name: item.status,
    itemStyle: {
      color: item.status === "Approved" ? "rgb(145,204,117)" : "rgb(238,102,102)", // Custom colors
    },
  }));

  const chartOptions = {
    tooltip: {
      trigger: "item",
    //   formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Request Status",
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
        Request Status Distribution
      </h2>
      <ReactECharts option={chartOptions} style={{ height: "350px", width: "100%" }} />
    </div>
  );
};

export default RequestStatusDistributionChart;
