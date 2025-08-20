import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Card,
  Space,
  Typography,
  Tag,
  message,
  Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("Services/GetAllServices");
        
        if (data.StatusCode === 200) {
          setServices(data.ResultSet);
        } else {
          setError(data.Message || "Failed to fetch services");
          message.error(data.Message || "Failed to fetch services");
        }
      } catch (err) {
        setError(err.message);
        message.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const formatCurrency = (value) => {
    return `Rs${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const columns = [
    {
      title: "Service ID",
      dataIndex: "S_ServiceID",
      key: "S_ServiceID",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Service Name",
      dataIndex: "S_ServiceName",
      key: "S_ServiceName",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "S_Description",
      key: "S_Description",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Base Charge",
      dataIndex: "S_BaseCharge",
      key: "S_BaseCharge",
      render: (price) => (
        <Text strong className="text-blue-600">
          {formatCurrency(price)}
        </Text>
      ),
    },
    {
      title: "Status",
      key: "Status",
      render: () => (
        <Tag color="green" className="capitalize">
          Active
        </Tag>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text type="danger">{error}</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card bordered={false} className="shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={3} className="mb-1">
              Services Management
            </Title>
            <Text type="secondary">View all active auto repair services</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            loading={loading}
            disabled
          >
            Add Service (Disabled)
          </Button>
        </div>
      </Card>

      <Card bordered={false} className="shadow-sm">
        <Table
          columns={columns}
          dataSource={services}
          rowKey="S_ServiceID"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Services;