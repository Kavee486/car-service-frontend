import { USER_ROLES } from '../constants';

class AuthService {
  constructor() {
    this.storageKey = 'autodeck_user';
  }

  login(credentials) {
    const { email, password, role } = credentials;
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Demo login credentials with updated appointments data
    const demoCredentials = {
      'admin@autodeck.com': { 
        password: 'admin123', 
        role: USER_ROLES.ADMIN, 
        name: 'Admin User',
        appointments: [
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
          }
        ]
      },
      'tech@autodeck.com': { 
        password: 'tech123', 
        role: USER_ROLES.TECHNICIAN, 
        name: 'Mike Wilson',
        appointments: [
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
          }
        ]
      },
      'customer@autodeck.com': { 
        password: 'customer123', 
        role: USER_ROLES.CUSTOMER, 
        name: 'John Doe',
        appointments: [
          {
            id: '4',
            customerName: 'John Doe',
            vehiclePlate: 'GHI-3456',
            service: 'AC Repair',
            date: '2023-06-18',
            time: '11:00 AM',
            status: 'disapproved',
            price: 24999,
            notes: 'Needs compressor replacement'
          }
        ]
      }
    };

    const demoUser = demoCredentials[email];
    if (demoUser && demoUser.password === password) {
      const userData = {
        id: Math.random().toString(36),
        email,
        role: demoUser.role,
        name: demoUser.name,
        appointments: demoUser.appointments,
        loginTime: new Date().toISOString()
      };
      this.setUser(userData);
      return userData;
    }

    const userData = {
      id: Math.random().toString(36),
      email,
      role: role || USER_ROLES.CUSTOMER,
      name: email.split('@')[0],
      appointments: [],
      loginTime: new Date().toISOString()
    };

    this.setUser(userData);
    return userData;
  }

  signup(userData) {
    const { name, email, password, role } = userData;
    
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const newUser = {
      id: Math.random().toString(36),
      name,
      email,
      role: role || USER_ROLES.CUSTOMER,
      appointments: [],
      createdAt: new Date().toISOString()
    };

    this.setUser(newUser);
    return newUser;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  setUser(userData) {
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    return user && user.role === requiredRole;
  }

  getUserAppointments() {
    const user = this.getCurrentUser();
    return user ? user.appointments : [];
  }

  addAppointment(appointment) {
    const user = this.getCurrentUser();
    if (user) {
      // Ensure new appointment has all required fields
      const completeAppointment = {
        id: Math.random().toString(36),
        customerName: user.name,
        vehiclePlate: appointment.vehiclePlate || 'N/A',
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
        status: 'pending',
        price: appointment.price || 0,
        notes: appointment.notes || '',
        createdAt: new Date().toISOString()
      };

      const updatedUser = {
        ...user,
        appointments: [...user.appointments, completeAppointment]
      };
      this.setUser(updatedUser);
      return updatedUser;
    }
    return null;
  }

  updateAppointment(id, updatedData) {
    const user = this.getCurrentUser();
    if (user) {
      const updatedAppointments = user.appointments.map(appointment => 
        appointment.id === id ? { ...appointment, ...updatedData } : appointment
      );
      
      const updatedUser = {
        ...user,
        appointments: updatedAppointments
      };
      this.setUser(updatedUser);
      return updatedUser;
    }
    return null;
  }

  deleteAppointment(id) {
    const user = this.getCurrentUser();
    if (user) {
      const updatedAppointments = user.appointments.filter(
        appointment => appointment.id !== id
      );
      
      const updatedUser = {
        ...user,
        appointments: updatedAppointments
      };
      this.setUser(updatedUser);
      return updatedUser;
    }
    return null;
  }
}

export default new AuthService();