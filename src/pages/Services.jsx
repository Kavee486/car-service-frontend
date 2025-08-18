import React, { useState } from 'react';
import { 
  Table, Button, Modal, Form, Input, InputNumber, 
  Card, Space, Typography, Tag, message, Radio 
} from 'antd';
import { 
  PlusOutlined, DeleteOutlined, EditOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Services = () => {
  // Sample initial data with Rs currency
  const initialServices = [
    { id: 1, name: 'Oil Change', description: 'Standard oil and filter change', baseCharge: 3499, status: 'Active' },
    { id: 2, name: 'Tire Rotation', description: 'Rotate all four tires', baseCharge: 1999, status: 'Active' },
    { id: 3, name: 'Brake Inspection', description: 'Complete brake system inspection', baseCharge: 2799, status: 'Inactive' },
  ];

  const [services, setServices] = useState(initialServices);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [form] = Form.useForm();

  const handleAddService = () => {
    setCurrentService(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditService = (service) => {
    setCurrentService(service);
    form.setFieldsValue({
      name: service.name,
      description: service.description,
      baseCharge: service.baseCharge,
      status: service.status
    });
    setIsModalVisible(true);
  };

  const handleDeleteService = (id) => {
    Modal.confirm({
      title: <span className="text-lg">Delete Service</span>,
      content: <span className="text-base">Are you sure you want to delete this service?</span>,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setServices(services.filter(service => service.id !== id));
        message.success('Service deleted successfully');
      }
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (currentService) {
        // Update existing service
        setServices(services.map(service => 
          service.id === currentService.id ? 
          { 
            ...service, 
            ...values,
            baseCharge: parseFloat(values.baseCharge)
          } : 
          service
        ));
        message.success('Service updated successfully');
      } else {
        // Add new service
        const newService = {
          id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
          ...values,
          baseCharge: parseFloat(values.baseCharge)
        };
        setServices([...services, newService]);
        message.success('Service added successfully');
      }
      setIsModalVisible(false);
    }).catch(err => {
      console.error('Validation failed:', err);
    });
  };

  // Format currency as Rs
  const formatCurrency = (value) => {
    return `Rs${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const columns = [
    {
      title: <span className="text-base font-medium">Service Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <Text strong className="text-base">{text}</Text>,
    },
    {
      title: <span className="text-base font-medium">Description</span>,
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text type="secondary" className="text-base">{text}</Text>,
    },
    {
      title: <span className="text-base font-medium">Base Charge</span>,
      dataIndex: 'baseCharge',
      key: 'baseCharge',
      width: 160,
      render: (price) => (
        <Text strong className="text-blue-600 text-base">
          {formatCurrency(price)}
        </Text>
      ),
      sorter: (a, b) => a.baseCharge - b.baseCharge,
    },
    {
      title: <span className="text-base font-medium">Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'} className="capitalize text-base">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: <span className="text-base font-medium">Actions</span>,
      key: 'actions',
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined className="text-blue-500 text-lg" />} 
            onClick={() => handleEditService(record)}
            className="hover:bg-blue-50"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined className="text-red-500 text-lg" />} 
            onClick={() => handleDeleteService(record.id)}
            className="hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <Card bordered={false} className="shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Title level={3} className="mb-2">Services Management</Title>
            <Text type="secondary" className="text-base">Manage your auto repair services</Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined className="text-lg" />} 
            onClick={handleAddService}
            className="bg-blue-600 hover:bg-blue-700 text-base"
            size="large"
          >
            Add Service
          </Button>
        </div>
      </Card>

      <Card bordered={false} className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={services} 
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => <span className="text-base">Total {total} services</span>
          }}
          scroll={{ x: true }}
          className="rounded-lg text-base"
        />
      </Card>

      <Modal
        title={<span className="text-xl font-semibold">
          {currentService ? 'Edit Service' : 'Add New Service'}
        </span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={700}
        centered
        className="rounded-lg"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'Active'
          }}
          className="text-base"
        >
          <div className="grid grid-cols-1 gap-6">
            <Form.Item
              name="name"
              label={<span className="font-medium text-base">Service Name</span>}
              rules={[{ required: true, message: 'Please input the service name!' }]}
            >
              <Input placeholder="Enter service name" size="large" className="text-base" />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="font-medium text-base">Description</span>}
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea 
                placeholder="Enter service description" 
                rows={3} 
                size="large" 
                className="text-base"
              />
            </Form.Item>

            <Form.Item
              name="baseCharge"
              label={<span className="font-medium text-base">Base Charge (Rs)</span>}
              rules={[{ 
                required: true, 
                message: 'Please input the base charge!',
                type: 'number',
                min: 0,
              }]}
            >
              <InputNumber 
                min={0} 
                precision={2} 
                style={{ width: '100%' }} 
                size="large" 
                className="w-full text-base"
                formatter={value => `Rs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/Rs\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="status"
              label={<span className="font-medium text-base">Status</span>}
            >
              <Radio.Group className="text-base">
                <Radio value="Active">Active</Radio>
                <Radio value="Inactive">Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => setIsModalVisible(false)} 
                size="large"
                className="px-6 text-base"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                className="bg-blue-600 hover:bg-blue-700 px-6 text-base"
              >
                {currentService ? 'Update Service' : 'Add Service'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;