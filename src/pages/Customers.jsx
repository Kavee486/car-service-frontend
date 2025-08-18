// src/pages/Customers.js
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Mock data
  useEffect(() => {
    const mockCustomers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        address: '123 Main St, Anytown, USA',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-987-6543',
        address: '456 Oak Ave, Somewhere, USA',
      },
      {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '555-456-7890',
        address: '789 Pine Rd, Nowhere, USA',
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '555-789-0123',
        address: '321 Elm Blvd, Anycity, USA',
      },
      {
        id: 5,
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '555-234-5678',
        address: '654 Cedar Ln, Yourtown, USA',
      },
    ];

    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 500);
  }, []);

  const handleDelete = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800">Customers</h2>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-lg mb-6">Are you sure you want to delete this customer? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">{customer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 text-lg text-gray-500">{customer.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                  <button
                    onClick={() => setDeleteConfirm(customer.id)}
                    className="text-red-600 hover:text-red-900 flex items-center"
                  >
                    <Trash2 className="h-5 w-5 mr-1" />
                    <span className="text-lg">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;