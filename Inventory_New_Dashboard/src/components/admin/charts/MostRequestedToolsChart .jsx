import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { Card, Spin, Alert } from 'antd';

const MostRequestedToolsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMostRequestedTools();
  }, []);

  const fetchMostRequestedTools = async () => {
    try {
      const response = await axios.get('http://localhost:8986/analytics/most_requested_tools');
      setData(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

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

  const xAxisData = data.map((item) => item.tool_name.trim()); // Trim tool names to remove unwanted whitespace
  const seriesData = data.map((item) => item.request_count);

  const option = {
    title: {
      text: 'Most Requested Tools',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        rotate: 45, // Rotate labels to prevent overlap
        interval: 0, // Show every label
        formatter: (value) => {
          // Adjust the label to ensure it fits in the available space
          return value.length > 10 ? `${value.substring(0, 10)}...` : value;
        },
        textStyle: {
          fontSize: 12, // Reduce font size for better fitting
        },
      },
      axisTick: {
        alignWithLabel: true, // Align ticks with labels
      },
      axisLine: {
        onZero: true, // Ensure the axis line is on zero
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: seriesData,
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#1890ff', // Ant Design primary color
        },
        lineStyle: {
          width: 2,
        },
      },
    ],
  };

  return (
    <Card className="shadow-md rounded-lg overflow-hidden m-5">
      <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
    </Card>
  );
};

export default MostRequestedToolsChart;
