import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, Card, message } from "antd";
import axios from "axios";

const { Option } = Select;

const CreateBatch = ({ onClose }) => {
  const [tools, setTools] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get("http://localhost:8986/tools");
      setTools(response.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
      message.error("Failed to fetch tools. Please try again.");
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      ToolID: values.toolID,
      BatchNumber: values.batchNumber,
      ManufactureDate: values.manufactureDate.toISOString(),
      ExpiryDate: values.expiryDate.toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:8986/api/", payload);
      const { BatchID } = response.data;
      message.success(`Batch created successfully with ID: ${BatchID}`);
      onClose();
    } catch (error) {
      console.error("Error submitting request:", error);
      message.error("Error creating batch. Please check the input values.");
    }
  };

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="toolID"
          label="Tool ID"
          rules={[{ required: true, message: "Please select a tool" }]}
        >
          <Select placeholder="Select a Tool">
            {tools.map((tool) => (
              <Option key={tool.ToolID} value={tool.ToolID}>
                {tool.ToolID} - {tool.ToolName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="batchNumber"
          label="Batch Number"
          rules={[{ required: true, message: "Please enter a batch number" }]}
        >
          <Input placeholder="Enter Batch Number" />
        </Form.Item>

        <Form.Item
          name="manufactureDate"
          label="Manufacture Date"
          rules={[{ required: true, message: "Please select manufacture date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          rules={[{ required: true, message: "Please select expiry date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button className="text-white hover:text-sky-500 bg-sky-600 w-full mt-4" htmlType="submit">
            Submit
          </Button>
          <Button onClick={onClose} style={{ marginLeft: "8px" }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateBatch;
