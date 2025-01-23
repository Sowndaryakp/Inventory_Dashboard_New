import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Card, Spin, Row, Col } from "antd";
import { ToolOutlined } from "@ant-design/icons";

const ToolTable = () => {
  const [data, setData] = useState([
    {
      key: "1",
      toolName: "End mill cutter Ø4",
      quantityAvailable: 22,
      status: "In Use",
      location: "NMTC",
      toolId: 8,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
    {
      key: "2",
      toolName: "Shoulder milling cutter Ø60",
      quantityAvailable: 1,
      status: "In Use",
      location: "UPE",
      toolId: 11,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
    {
      key: "3",
      toolName: "Face milling cutter Ø63",
      quantityAvailable: 20,
      status: "Available",
      location: "SVT",
      toolId: 13,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
    {
      key: "4",
      toolName: "Test EPC",
      quantityAvailable: 10,
      status: "Available",
      location: "Test_location",
      toolId: 14,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
    {
      key: "5",
      toolName: "Test_2",
      quantityAvailable: 5,
      status: "Available",
      location: "Tes_location",
      toolId: 15,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
    {
      key: "6",
      toolName: "tool_test_01",
      quantityAvailable: 5,
      status: "Available",
      location: "Test-loation",
      toolId: 16,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
    {
      key: "7",
      toolName: "new rfid test",
      quantityAvailable: 0,
      status: "Available",
      location: "automation",
      toolId: 21,
      lastUpdated: "1/1/1970, 5:30:00 am",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({ userId: "", parentId: "" });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8986/inventory/analytics");
        const result = await response.json();
        setAnalyticsData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tool Name",
      dataIndex: "toolName",
      key: "toolName",
      sorter: (a, b) => a.toolName.localeCompare(b.toolName),
    },
    {
      title: "Quantity Available",
      dataIndex: "quantityAvailable",
      key: "quantityAvailable",
      sorter: (a, b) => a.quantityAvailable - b.quantityAvailable,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "In Use", value: "In Use" },
        { text: "Available", value: "Available" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Tool ID",
      dataIndex: "toolId",
      key: "toolId",
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button className="bg-sky-900 text-white hover:text-sky-500  onClick={() => handleRequest(record.toolName)}>
          Request
        </Button>
      ),
    },
  ];

  const handleRequest = (toolName) => {
    alert(`Requested Tool: ${toolName}`);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({ userId: "", parentId: "" });
  };

  const handleSubmit = () => {
    console.log("Submitted Form Data:", formData);
    setIsModalVisible(false);
    setFormData({ userId: "", parentId: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={16}>
            <Col span={8}>
              <Card
                className="shadow-md"
                title={
                  <div className="flex items-center gap-2">
                    <ToolOutlined style={{ fontSize: "24px", color: "#1677ff" }} />
                    <span className="text-lg font-semibold">Total Tools</span>
                  </div>
                }
              >
                <div className="text-2xl font-bold">{analyticsData?.total_tools || 0}</div>
              </Card>
            </Col>

            <Col span={8}>
              <Card
                className="shadow-md"
                title="Total Requests"
              >
                <div className="text-2xl font-bold">{analyticsData?.total_requests || 0}</div>
              </Card>
            </Col>

            <Col span={8}>
              <Card
                className="shadow-md"
                title="Tools In Use"
              >
                <div className="text-2xl font-bold">{analyticsData?.tools_in_use || 0}</div>
              </Card>
            </Col>
          </Row>
        )}

        <Button className="bg-sky-900 text-white hover:text-sky-500 " onClick={handleOpenModal}>
          Add New Tool Request
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
        className="shadow-md"
      />

      <Modal
        title="Create AddNewToolRequest"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" className="bg-sky-900 text-white hover:text-sky-500 bg-sky-600" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">User ID</label>
          <Input
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter User ID"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Parent ID (optional)</label>
          <Input
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            placeholder="Enter Parent ID"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ToolTable;
