import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Space, Modal, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import authService from '../services/authService';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Simulate fetching appointments from API
    const fetchAppointments = () => {
      setTimeout(() => {
        const demoAppointments = [
          {
            id: '1',
            customerName: 'John Doe',
            vehiclePlate: 'ABC-1234',
            service: 'Oil Change',
            date: '2023-06-15',
            time: '10:00 AM',
            status: 'approved',
            price: 5999,
            notes: 'Customer requested synthetic oil'
          },
          {
            id: '2',
            customerName: 'Jane Smith',
            vehiclePlate: 'XYZ-5678',
            service: 'Brake Replacement',
            date: '2023-06-16',
            time: '2:30 PM',
            status: 'completed',
            price: 19999,
            notes: 'Front brakes only'
          },
          {
            id: '3',
            customerName: 'Robert Johnson',
            vehiclePlate: 'DEF-9012',
            service: 'Tire Rotation',
            date: '2023-06-17',
            time: '9:00 AM',
            status: 'pending',
            price: 2999,
            notes: 'Include wheel balancing'
          },
          {
            id: '4',
            customerName: 'Emily Davis',
            vehiclePlate: 'GHI-3456',
            service: 'AC Repair',
            date: '2023-06-18',
            time: '11:00 AM',
            status: 'disapproved',
            price: 24999,
            notes: 'Needs compressor replacement'
          }
        ];
        setAppointments(demoAppointments);
        setLoading(false);
      }, 1000);
    };

    fetchAppointments();
  }, []);

  const showDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const columns = [
    {
      title: <span className="text-base">Customer Name</span>,
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <span className="text-base">{text}</span>,
    },
    {
      title: <span className="text-base">Vehicle Plate</span>,
      dataIndex: 'vehiclePlate',
      key: 'vehiclePlate',
      render: (text) => <span className="text-base">{text}</span>,
    },
    {
      title: <span className="text-base">Service</span>,
      dataIndex: 'service',
      key: 'service',
      render: (text) => <span className="text-base">{text}</span>,
    },
    {
      title: <span className="text-base">Date & Time</span>,
      key: 'datetime',
      render: (_, record) => (
        <span className="text-base">{record.date} at {record.time}</span>
      ),
    },
    {
      title: <span className="text-base">Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color, icon;
        switch (status) {
          case 'approved':
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
          case 'completed':
            color = 'blue';
            icon = <CheckCircleOutlined />;
            break;
          case 'disapproved':
            color = 'red';
            icon = <CloseCircleOutlined />;
            break;
          default:
            color = 'orange';
            icon = <ClockCircleOutlined />;
        }
        return (
          <Tag icon={icon} color={color} className="text-base">
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: <span className="text-base">Price</span>,
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="text-base">Rs. {price.toLocaleString('en-IN')}</span>,
    },
    {
      title: <span className="text-base">Actions</span>,
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showDetails(record)} className="text-base">
            Details
          </Button>
          {authService.hasRole('admin') || authService.hasRole('technician') ? (
            <>
              <Button 
                type="primary" 
                ghost 
                onClick={() => handleStatusChange(record.id, 'approved')}
                disabled={record.status === 'approved' || record.status === 'completed'}
                className="text-base"
              >
                Approve
              </Button>
              <Button 
                danger 
                onClick={() => handleStatusChange(record.id, 'disapproved')}
                disabled={record.status === 'disapproved' || record.status === 'completed'}
                className="text-base"
              >
                Reject
              </Button>
              <Button 
                type="primary" 
                onClick={() => handleStatusChange(record.id, 'completed')}
                disabled={record.status === 'completed'}
                className="text-base"
              >
                Complete
              </Button>
            </>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        {authService.hasRole('customer') && (
          <Button type="primary" size="large" className="text-base">
            Book New Appointment
          </Button>
        )}
      </div>
      
      <Table 
        columns={columns} 
        dataSource={appointments} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="text-base"
      />
      
      <Modal
        title={<span className="text-xl">Appointment Details</span>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} size="large" className="text-base">
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedAppointment && (
          <div className="space-y-4 text-base">
            <p><strong>Customer:</strong> {selectedAppointment.customerName}</p>
            <p><strong>Vehicle Plate:</strong> {selectedAppointment.vehiclePlate}</p>
            <p><strong>Service:</strong> {selectedAppointment.service}</p>
            <p><strong>Date:</strong> {selectedAppointment.date}</p>
            <p><strong>Time:</strong> {selectedAppointment.time}</p>
            <p className="flex items-center">
              <strong className="mr-2">Status:</strong> 
              <Badge 
                status={
                  selectedAppointment.status === 'approved' ? 'success' : 
                  selectedAppointment.status === 'completed' ? 'processing' : 
                  selectedAppointment.status === 'disapproved' ? 'error' : 'warning'
                } 
                text={selectedAppointment.status.toUpperCase()} 
                className="ml-2 text-base"
              />
            </p>
            <p><strong>Price:</strong> Rs. {selectedAppointment.price.toLocaleString('en-IN')}</p>
            <p><strong>Notes:</strong> {selectedAppointment.notes}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;