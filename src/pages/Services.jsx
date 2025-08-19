import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../actions/ServicesAction";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Card,
  Space,
  Typography,
  Tag,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error, success } = useSelector(
    (state) => state.services
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    if (success) {
      message.success(
        currentService 
          ? "Service updated successfully" 
          : "Service created successfully"
      );
    }
  }, [error, success, currentService]);

  const handleAddService = () => {
    setCurrentService(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditService = (service) => {
    setCurrentService(service);
    form.setFieldsValue({
      S_ServiceName: service.S_ServiceName,
      S_Description: service.S_Description,
      S_BaseCharge: parseFloat(service.S_BaseCharge),
    });
    setIsModalVisible(true);
  };

  const handleDeleteService = (id) => {
    Modal.confirm({
      title: "Delete Service",
      content: "Are you sure you want to delete this service?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteService(id))
          .then(() => message.success("Service deleted successfully"))
          .catch(() => message.error("Failed to delete service"));
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const serviceData = {
        ...values,
        S_BaseCharge: values.S_BaseCharge.toString(),
      };

      if (currentService) {
        serviceData.S_ServiceID = currentService.S_ServiceID;
        dispatch(updateService(serviceData));
      } else {
        dispatch(createService(serviceData));
      }
      setIsModalVisible(false);
    });
  };

  const formatCurrency = (value) => {
    return `Rs${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const columns = [
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
      dataIndex: "Status",
      key: "Status",
      render: (status) => (
        <Tag color={status === "A" ? "green" : "red"} className="capitalize">
          {status === "A" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined className="text-blue-500" />}
            onClick={() => handleEditService(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined className="text-red-500" />}
            onClick={() => handleDeleteService(record.S_ServiceID)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card bordered={false} className="shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={3} className="mb-1">
              Services Management
            </Title>
            <Text type="secondary">Manage your auto repair services</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddService}
            loading={loading}
          >
            Add Service
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

      <Modal
        title={currentService ? "Edit Service" : "Add New Service"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="S_ServiceName"
            label="Service Name"
            rules={[{ required: true, message: "Please input service name!" }]}
          >
            <Input placeholder="Oil Change" />
          </Form.Item>

          <Form.Item
            name="S_Description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea rows={3} placeholder="Service description" />
          </Form.Item>

          <Form.Item
            name="S_BaseCharge"
            label="Base Charge (Rs)"
            rules={[{ required: true, message: "Please input base charge!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/Rs\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-3">
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {currentService ? "Update" : "Add"} Service
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;