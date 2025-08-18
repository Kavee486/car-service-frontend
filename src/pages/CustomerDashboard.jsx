import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { Car, Calendar, Clock, FileText, MapPin, Plus, Phone } from 'lucide-react';

const CustomerDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehiclesData, appointmentsData] = await Promise.all([
          dataService.getVehicles(),
          dataService.getAppointments()
        ]);
        setVehicles(vehiclesData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const serviceHistory = [
    {
      id: 1,
      date: '2024-12-15',
      service: 'Oil Change',
      vehicle: '2020 Honda Accord',
      cost: 'Rs 3,450',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-11-28',
      service: 'Tire Rotation',
      vehicle: '2018 Toyota Camry',
      cost: 'Rs 2,250',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-10-10',
      service: 'Brake Inspection',
      vehicle: '2020 Honda Accord',
      cost: 'Rs 6,750',
      status: 'Completed'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
        <p className="text-blue-100 text-lg">Manage your vehicles and appointments with ease</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="bg-white text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center text-lg">
            <Plus className="h-5 w-5 mr-2" />
            Schedule Service
          </button>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors flex items-center text-lg">
            <Phone className="h-5 w-5 mr-2" />
            Contact Support
          </button>
        </div>
      </div>

      {/* My Vehicles */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Car className="h-7 w-7 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold">My Vehicles</h3>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center text-lg">
            <Plus className="h-5 w-5 mr-2" />
            Add Vehicle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-20 h-14 object-cover rounded mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">{vehicle.year} {vehicle.make} {vehicle.model}</h4>
                  <p className="text-gray-600">{vehicle.color} • {vehicle.mileage} miles</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Service:</span>
                <span className="font-medium text-blue-600">{vehicle.nextService}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <Calendar className="h-7 w-7 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
          </div>
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border-l-4 border-green-500 pl-5 py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{appointment.service}</p>
                    <p className="text-gray-600">{appointment.vehicle}</p>
                    <p className="text-gray-500">Technician: {appointment.technician}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-gray-600">{appointment.time}</p>
                    <span className={`px-3 py-1.5 rounded text-sm ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors text-lg">
            Schedule New Appointment
          </button>
        </div>

        {/* Service History */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <Clock className="h-7 w-7 text-orange-600 mr-3" />
            <h3 className="text-xl font-semibold">Recent Service History</h3>
          </div>
          <div className="space-y-4">
            {serviceHistory.map((service) => (
              <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-lg">{service.service}</p>
                  <p className="text-gray-600">{service.vehicle}</p>
                  <p className="text-gray-500">{service.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 text-lg">{service.cost}</p>
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-lg">
            <FileText className="h-5 w-5 mr-2" />
            View All History
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-blue-500 text-white px-6 py-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-lg">
            <Calendar className="h-5 w-5 mr-3" />
            Book Appointment
          </button>
          <button className="bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center text-lg">
            <MapPin className="h-5 w-5 mr-3" />
            Find Location
          </button>
          <button className="bg-orange-500 text-white px-6 py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-lg">
            <Phone className="h-5 w-5 mr-3" />
            Call Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;