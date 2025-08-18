import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Car, DollarSign, Clock,
  Plus, FileText, Settings,
  AlertCircle, CheckCircle, ChevronRight
} from 'lucide-react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayAppointments: 0,
    vehiclesServiced: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setStats({
          totalUsers: 2847,
          todayAppointments: 34,
          vehiclesServiced: 1293,
          monthlyRevenue: 45280
        });
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // Data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (Rs)',
        data: [32000, 38000, 42000, 39000, 45000, 48000],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const serviceDistributionData = {
    labels: ['Oil Change', 'Tire Rotation', 'Brake Service', 'AC Repair', 'Other'],
    datasets: [
      {
        label: 'Services Performed',
        data: [120, 85, 65, 45, 30],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const customerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [120, 145, 180, 210, 240, 290],
        fill: false,
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        tension: 0.1,
      },
    ],
  };

  const statsCards = [
    { icon: Users, label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12%', color: 'bg-blue-500' },
    { icon: Calendar, label: "Today's Appointments", value: stats.todayAppointments, change: '+8%', color: 'bg-green-500' },
    { icon: Car, label: 'Vehicles Serviced', value: stats.vehiclesServiced.toLocaleString(), change: '+15%', color: 'bg-orange-500' },
    { icon: DollarSign, label: 'Monthly Revenue', value: `Rs ${stats.monthlyRevenue.toLocaleString()}`, change: '+22%', color: 'bg-purple-500' }
  ];

  const recentAppointments = [
    { id: 1, customer: 'John Doe', service: 'Oil Change', time: '9:00 AM', status: 'In Progress', technician: 'Mike Wilson' },
    { id: 2, customer: 'Sarah Smith', service: 'Brake Inspection', time: '10:30 AM', status: 'Completed', technician: 'Emma Johnson' },
    { id: 3, customer: 'Robert Lee', service: 'Tire Rotation', time: '2:00 PM', status: 'Scheduled', technician: 'Alex Chen' }
  ];

  const recentActivities = [
    { id: 1, action: 'New customer registered', time: '2 mins ago', icon: Users },
    { id: 2, action: 'Appointment completed', time: '15 mins ago', icon: CheckCircle },
    { id: 3, action: 'New service added', time: '1 hour ago', icon: Plus },
    { id: 4, action: 'System update', time: '3 hours ago', icon: Settings }
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
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg p-6 text-white`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base font-medium">{card.label}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <card.icon className="h-8 w-8" />
            </div>
            <p className="text-sm mt-3 opacity-80">{card.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue (Rs)</h2>
          <div className="h-80"> {/* Increased height from h-64 to h-80 */}
            <Bar 
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14
                      }
                    }
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 14
                      }
                    }
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 14
                      },
                      callback: function(value) {
                        return 'Rs ' + value;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Service Distribution</h2>
          <div className="h-80"> {/* Increased height from h-64 to h-80 */}
            <Pie 
              data={serviceDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      font: {
                        size: 14
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Customer Growth</h2>
        <div className="h-80"> {/* Increased height from h-64 to h-80 */}
          <Line 
            data={customerGrowthData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: {
                      size: 14
                    }
                  }
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 14
                    }
                  }
                },
                y: {
                  ticks: {
                    font: {
                      size: 14
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-base">{appointment.customer}</p>
                  <p className="text-base text-gray-600">{appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-base">{appointment.time}</p>
                  <p className={`text-sm ${
                    appointment.status === 'Completed' ? 'text-green-500' :
                    appointment.status === 'In Progress' ? 'text-blue-500' : 'text-gray-500'
                  }`}>
                    {appointment.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start">
                  <div className={`p-3 rounded-full mr-4 ${
                    activity.id === 1 ? 'bg-blue-100 text-blue-500' :
                    activity.id === 2 ? 'bg-green-100 text-green-500' :
                    activity.id === 3 ? 'bg-purple-100 text-purple-500' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;