import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  User,
  ChevronRight
} from 'lucide-react';

const TechnicianDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    scheduledJobs: 0,
    inProgress: 0,
    completedToday: 0,
    hoursWorked: 0
  });

  const [workOrders, setWorkOrders] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API calls
      setTimeout(() => {
        setStats({
          scheduledJobs: 6,
          inProgress: 2,
          completedToday: 4,
          hoursWorked: 6.5
        });

        setWorkOrders([
          { 
            id: 'WO-1001', 
            service: 'Brake Pad Replacement', 
            customer: 'John Smith', 
            vehicle: 'Toyota Camry 2018', 
            priority: 'high', 
            estimatedTime: '2.5 hours',
            status: 'in-progress'
          },
          { 
            id: 'WO-1002', 
            service: 'Oil Change', 
            customer: 'Sarah Johnson', 
            vehicle: 'Honda Accord 2020', 
            priority: 'medium', 
            estimatedTime: '1 hour',
            status: 'scheduled'
          },
          { 
            id: 'WO-1003', 
            service: 'Tire Rotation', 
            customer: 'Mike Brown', 
            vehicle: 'Ford F-150 2019', 
            priority: 'low', 
            estimatedTime: '45 mins',
            status: 'scheduled'
          }
        ]);

        setTodaySchedule([
          { time: '8:00 AM', task: 'Oil Change - Honda Accord', customer: 'John Doe', status: 'completed' },
          { time: '9:30 AM', task: 'Brake Service - Toyota Camry', customer: 'Sarah Smith', status: 'in-progress' },
          { time: '11:00 AM', task: 'Engine Diagnostic - Ford F-150', customer: 'Mike Johnson', status: 'scheduled' },
          { time: '2:00 PM', task: 'Tire Rotation - Nissan Altima', customer: 'Lisa Brown', status: 'scheduled' }
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const statsCards = [
    { icon: Calendar, label: 'Scheduled Jobs', value: stats.scheduledJobs, color: 'bg-blue-500' },
    { icon: Wrench, label: 'In Progress', value: stats.inProgress, color: 'bg-orange-500' },
    { icon: CheckCircle, label: 'Completed Today', value: stats.completedToday, color: 'bg-green-500' },
    { icon: Clock, label: 'Hours Worked', value: stats.hoursWorked, color: 'bg-purple-500' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Technician Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`${card.color} rounded-lg p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-medium">{card.label}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
                <Icon className="h-8 w-8" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Work Orders and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Work Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Wrench className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Current Work Orders</h2>
          </div>
          <div className="space-y-4">
            {workOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-blue-700">{order.id}</p>
                    <p className="text-gray-800">{order.service}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : order.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{order.customer}</span>
                  </div>
                  <p>{order.vehicle}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span>Est. Time: {order.estimatedTime}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'in-progress' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
          </div>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.time}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{item.task}</p>
                  <p className="text-xs text-gray-600">{item.customer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Wrench className="h-4 w-4 mr-2" />
            Start Work Order
          </button>
          <button className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Complete
          </button>
          <button className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Report Issue
          </button>
          <button className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" />
            Log Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;