import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Upload, message, Tag, Card, Space, Typography } from 'antd';
import { UploadOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PartsInventory = () => {
  const [parts, setParts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const mockParts = [
        {
          id: 1,
          name: 'Brake Pad',
          stockQuantity: 50,
          unitPrice: 24.99,
          imageUrl: 'https://via.placeholder.com/150?text=Brake+Pad',
          status: 'In Stock'
        },
        {
          id: 2,
          name: 'Oil Filter',
          stockQuantity: 120,
          unitPrice: 8.99,
          imageUrl: 'https://via.placeholder.com/150?text=Oil+Filter',
          status: 'In Stock'
        },
        {
          id: 3,
          name: 'Air Filter',
          stockQuantity: 0,
          unitPrice: 12.49,
          imageUrl: 'https://via.placeholder.com/150?text=Air+Filter',
          status: 'Out of Stock'
        }
      ];
      setParts(mockParts);
    } catch (error) {
      message.error('Failed to fetch parts');
    } finally {
      setLoading(false);
    }
  };

  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showAddModal = () => {
    setCurrentPart(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (part) => {
    setCurrentPart(part);
    form.setFieldsValue({
      name: part.name,
      stockQuantity: part.stockQuantity,
      unitPrice: part.unitPrice,
      image: part.imageUrl ? [{ uid: '-1', name: 'image', status: 'done', url: part.imageUrl }] : []
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      // Replace with actual API call
      setParts(parts.filter(part => part.id !== id));
      message.success('Part deleted successfully');
    } catch (error) {
      message.error('Failed to delete part');
    }
  };

  const onFinish = async (values) => {
    try {
      const imageUrl = values.image && values.image[0]?.url || currentPart?.imageUrl || '';
      
      if (currentPart) {
        // Update existing part
        setParts(parts.map(part => 
          part.id === currentPart.id ? 
          { 
            ...part, 
            ...values, 
            imageUrl,
            status: values.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'
          } : 
          part
        ));
        message.success('Part updated successfully');
      } else {
        // Add new part
        const newPart = {
          id: Math.max(...parts.map(p => p.id), 0) + 1,
          name: values.name,
          stockQuantity: values.stockQuantity,
          unitPrice: values.unitPrice,
          imageUrl,
          status: values.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'
        };
        setParts([...parts, newPart]);
        message.success('Part added successfully');
      }
      
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save part');
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const columns = [
    {
      title: <span className="text-base">Image</span>,
      dataIndex: 'imageUrl',
      key: 'image',
      width: 120,
      render: (url) => (
        <div className="flex justify-center">
          <img 
            src={url || 'https://via.placeholder.com/50?text=Part'} 
            alt="Part" 
            className="w-14 h-14 object-cover rounded-lg"
          />
        </div>
      ),
    },
    {
      title: <span className="text-base">Part Name</span>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <Text strong className="text-base">{text}</Text>,
    },
    {
      title: <span className="text-base">Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => (
        <Tag color={status === 'In Stock' ? 'green' : 'red'} className="capitalize text-base">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'In Stock', value: 'In Stock' },
        { text: 'Out of Stock', value: 'Out of Stock' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: <span className="text-base">Stock Quantity</span>,
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      width: 140,
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
      render: (quantity) => (
        <Text type={quantity > 0 ? undefined : 'danger'} className="text-base">
          {quantity}
        </Text>
      ),
    },
    {
      title: <span className="text-base">Unit Price</span>,
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 140,
      render: (price) => (
        <Text strong className="text-blue-600 text-base">
          Rs{price.toFixed(2)}
        </Text>
      ),
      sorter: (a, b) => a.unitPrice - b.unitPrice,
    },
    {
      title: <span className="text-base">Actions</span>,
      key: 'actions',
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined className="text-blue-500 text-lg" />} 
            onClick={() => showEditModal(record)}
            className="hover:bg-blue-50"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined className="text-red-500 text-lg" />} 
            onClick={() => handleDelete(record.id)}
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
            <Title level={3} className="mb-1">Parts Inventory</Title>
            <Text type="secondary" className="text-base">Manage your auto parts inventory</Text>
          </div>
          <Space>
            <Input
              placeholder="Search parts..."
              prefix={<SearchOutlined className="text-lg" />}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full md:w-64 text-base"
              size="large"
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined className="text-lg" />} 
              onClick={showAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-base"
              size="large"
            >
              Add Part
            </Button>
          </Space>
        </div>
      </Card>

      <Card bordered={false} className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={filteredParts} 
          rowKey="id" 
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => <span className="text-base">Total {total} items</span>
          }}
          scroll={{ x: true }}
          className="rounded-lg text-base"
        />
      </Card>

      <Modal
        title={<span className="text-xl font-semibold">{currentPart ? 'Edit Part' : 'Add New Part'}</span>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={700}
        centered
        className="rounded-lg"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            stockQuantity: 0,
            unitPrice: 0.00
          }}
          className="text-base"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Form.Item
                name="name"
                label={<span className="font-medium text-base">Part Name</span>}
                rules={[{ required: true, message: 'Please input the part name!' }]}
              >
                <Input placeholder="Enter part name" size="large" className="text-base" />
              </Form.Item>
            </div>

            <Form.Item
              name="stockQuantity"
              label={<span className="font-medium text-base">Stock Quantity</span>}
              rules={[{ required: true, message: 'Please input the stock quantity!' }]}
            >
              <InputNumber 
                min={0} 
                style={{ width: '100%' }} 
                size="large" 
                className="w-full text-base"
              />
            </Form.Item>

            <Form.Item
              name="unitPrice"
              label={<span className="font-medium text-base">Unit Price (Rs)</span>}
              rules={[{ required: true, message: 'Please input the unit price!' }]}
            >
              <InputNumber 
                min={0} 
                precision={2} 
                style={{ width: '100%' }} 
                size="large" 
                className="w-full text-base"
              />
            </Form.Item>

            <div className="md:col-span-2">
              <Form.Item
                name="image"
                label={<span className="font-medium text-base">Part Image</span>}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="image"
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  className="w-full"
                >
                  <div className="flex flex-col items-center">
                    <UploadOutlined className="text-2xl" />
                    <div className="mt-2 text-base">Click to upload</div>
                    <div className="text-sm text-gray-400">Supports: JPG, PNG</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Form.Item className="mt-6">
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={handleCancel} 
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
                {currentPart ? 'Update Part' : 'Add Part'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PartsInventory;