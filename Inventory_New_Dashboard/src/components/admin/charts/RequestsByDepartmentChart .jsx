// src/components/RequestsByDepartmentChart.js

import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import ReactECharts from 'echarts-for-react';

const RequestsByDepartmentChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8986/analytics/requests_by_department');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="m-5"
      />
    );
  }

  // Transform data to create a map of department names and their counts for each status
  const departmentData = {};
  data.forEach(({ department_name, status, count }) => {
    if (!departmentData[department_name]) {
      departmentData[department_name] = { Approved: 0, Pending: 0 };
    }
    departmentData[department_name][status] += count;
  });

  // Prepare data for the chart
  const xAxisData = Object.keys(departmentData);
  const approvedData = xAxisData.map((department) => departmentData[department].Approved);
  const pendingData = xAxisData.map((department) => departmentData[department].Pending);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      data: ['Approved', 'Pending'],
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Count',
      },
    ],
    series: [
      {
        name: 'Approved',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#91CC75', // Green color for Approved
        },
        data: approvedData,
      },
      {
        name: 'Pending',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: '#5470C6', // sky color for Pending
        },
        data: pendingData,
      },
    ],
  };

  return (
    <Card className="shadow-md rounded-lg overflow-hidden m-5">
      <h2 className="text-2xl text-center font-bold mt-5">Requests by Department</h2>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </Card>
  );
};

export default RequestsByDepartmentChart;
