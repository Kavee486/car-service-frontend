// src/pages/TechnicianSchedule.js
import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Wrench, ChevronDown, ChevronUp } from 'lucide-react';

const TechnicianSchedule = () => {
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      customer: 'John Smith',
      vehicle: 'Toyota Camry 2020',
      service: 'Oil Change',
      date: '2023-06-15',
      time: '09:00 AM',
      status: 'pending',
      notes: 'Synthetic oil requested'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      vehicle: 'Honda Accord 2018',
      service: 'Brake Inspection',
      date: '2023-06-15',
      time: '11:30 AM',
      status: 'in-progress',
      notes: 'Squeaking noise reported'
    },
    {
      id: 3,
      customer: 'Mike Brown',
      vehicle: 'Ford F-150 2021',
      service: 'Tire Rotation',
      date: '2023-06-15',
      time: '02:00 PM',
      status: 'completed',
      notes: 'Include wheel balancing'
    },
    {
      id: 4,
      customer: 'Lisa Williams',
      vehicle: 'Nissan Altima 2019',
      service: 'AC Repair',
      date: '2023-06-16',
      time: '10:00 AM',
      status: 'pending',
      notes: 'Not cooling properly'
    }
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const updateStatus = (id, newStatus) => {
    setSchedule(schedule.map(item => 
      item.id === id ? {...item, status: newStatus} : item
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Calendar className="h-10 w-10 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">My Schedule</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700 text-lg">
          <div className="col-span-2">Date & Time</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Vehicle</div>
          <div className="col-span-2">Service</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Actions</div>
        </div>

        {schedule.map((item) => (
          <div key={item.id} className="border-b border-gray-200">
            <div 
              className="grid grid-cols-12 p-4 items-center hover:bg-gray-50 cursor-pointer text-base"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="col-span-2 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <span>{item.date} • {item.time}</span>
              </div>
              <div className="col-span-3 font-medium">{item.customer}</div>
              <div className="col-span-2 text-gray-600">{item.vehicle}</div>
              <div className="col-span-2">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-blue-500" />
                  {item.service}
                </div>
              </div>
              <div className="col-span-2">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
              <div className="col-span-1 flex justify-center">
                {expandedId === item.id ? (
                  <ChevronUp className="h-6 w-6 text-gray-500" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                )}
              </div>
            </div>

            {expandedId === item.id && (
              <div className="bg-gray-50 p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Service Details</h3>
                    <p className="text-gray-800 text-lg">{item.service}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Customer Notes</h3>
                    <p className="text-gray-800 text-lg">{item.notes || 'No notes provided'}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => updateStatus(item.id, 'pending')}
                    className={`px-5 py-3 rounded-lg text-base font-medium ${
                      item.status === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, 'in-progress')}
                    className={`px-5 py-3 rounded-lg text-base font-medium ${
                      item.status === 'in-progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, 'completed')}
                    className={`px-5 py-3 rounded-lg text-base font-medium ${
                      item.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, 'cancelled')}
                    className={`px-5 py-3 rounded-lg text-base font-medium ${
                      item.status === 'cancelled'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianSchedule;