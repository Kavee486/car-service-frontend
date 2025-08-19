import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { Car, Shield, Clock, Star, Phone, Mail, MapPin, Wrench, Zap, Award, Check, Users, Battery, Droplet, Settings, Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const services = [
    {
      icon: Wrench,
      title: "Preventive Maintenance",
      description: "Comprehensive check-ups to prevent costly repairs and extend vehicle lifespan",
      features: ["Oil changes", "Fluid checks", "Filter replacements", "Battery testing"]
    },
    {
      icon: Zap,
      title: "Electrical Systems",
      description: "Diagnosis and repair of all electrical components for optimal performance",
      features: ["Battery service", "Alternator repair", "Starter motor", "Wiring issues"]
    },
    {
      icon: Shield,
      title: "Brake & Suspension",
      description: "Complete brake system service and suspension alignment for safety",
      features: ["Brake pads", "Rotors", "Shock absorbers", "Wheel alignment"]
    },
    {
      icon: Car,
      title: "Engine Repair",
      description: "Expert diagnosis and repair of all engine components and systems",
      features: ["Engine rebuilds", "Timing belts", "Cooling system", "Performance tuning"]
    },
    {
      icon: Droplet,
      title: "Transmission Service",
      description: "Specialized care for automatic and manual transmissions",
      features: ["Fluid changes", "Clutch repair", "Transmission rebuild", "Diagnostics"]
    },
    {
      icon: Battery,
      title: "Hybrid/Electric",
      description: "Certified service for hybrid and electric vehicle systems",
      features: ["Battery maintenance", "Charging systems", "Motor diagnostics", "Software updates"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Exceptional service! My car runs better than when it was new. The team went above and beyond to explain everything.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      date: "2 weeks ago"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Honest and professional. They identified issues others missed and saved me thousands in potential repairs.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      date: "1 month ago"
    },
    {
      name: "Lisa Rodriguez",
      rating: 5,
      comment: "Fast, reliable, and transparent pricing. My family has been coming here for years and we've never been disappointed.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      date: "3 months ago"
    }
  ];

  const heroImages = [
    {
      url: "https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      alt: "Professional mechanic working on car engine"
    },
    {
      url: "https://images.pexels.com/photos/4488645/pexels-photo-4488645.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      alt: "Technician performing vehicle diagnostics"
    },
    {
      url: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      alt: "Modern auto repair shop with multiple service bays"
    },
    {
      url: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      alt: "Car lift with vehicle undergoing maintenance"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Car className="h-9 w-9 text-[#1E3A8A] mr-3" />
              </motion.div>
              <span className="text-2xl font-bold text-gray-900">{COMPANY_INFO.NAME}</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.a 
                href="#services" 
                whileHover={{ scale: 1.05, color: "#1E3A8A" }}
                className="text-gray-700 transition-colors font-medium"
              >
                Services
              </motion.a>
              <motion.a 
                href="#about" 
                whileHover={{ scale: 1.05, color: "#1E3A8A" }}
                className="text-gray-700 transition-colors font-medium"
              >
                About
              </motion.a>
              <motion.a 
                href="#testimonials" 
                whileHover={{ scale: 1.05, color: "#1E3A8A" }}
                className="text-gray-700 transition-colors font-medium"
              >
                Testimonials
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, color: "#1E3A8A" }}
                className="text-gray-700 transition-colors font-medium"
              >
                Contact
              </motion.a>
              <div className="flex items-center space-x-4 ml-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link 
                    to="/login" 
                    className="text-[#1E3A8A] hover:text-[#152C5E] font-medium transition-colors px-4 py-2 rounded-lg hover:bg-[#EFF6FF]"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/signup" 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1E3A8A] focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          className="md:hidden bg-white shadow-lg overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#services"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1E3A8A] hover:bg-[#EFF6FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1E3A8A] hover:bg-[#EFF6FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1E3A8A] hover:bg-[#EFF6FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1E3A8A] hover:bg-[#EFF6FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5 space-x-4">
                <Link
                  to="/login"
                  className="w-full text-center text-[#1E3A8A] hover:text-[#152C5E] font-medium transition-colors px-4 py-2 rounded-lg hover:bg-[#EFF6FF]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1E3A8A] to-[#152C5E] text-white py-32 overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${heroImages[currentImageIndex].url}')`,
                backgroundAttachment: 'fixed'
              }}
              aria-label={heroImages[currentImageIndex].alt}
            />
          </AnimatePresence>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Auto Care
              <span className="block text-orange-400 mt-4">Where Excellence Meets Precision</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Combining cutting-edge technology with decades of automotive expertise to deliver 
            unparalleled service for your vehicle.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Book Service Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="#services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#1E3A8A] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Settings className="h-5 w-5" />
                Explore Services
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-orange-400 w-6' : 'bg-white/50 w-2'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="bg-[#EFF6FF] py-8 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {[
              { icon: Award, text: "ASE Certified Technicians" },
              { icon: Shield, text: "Lifetime Warranty" },
              { icon: Clock, text: "Same-Day Service" },
              { icon: Check, text: "100% Satisfaction Guarantee" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="flex items-center justify-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-[#E0E7FF] p-2 rounded-full">
                  <item.icon className="h-5 w-5 text-[#1E3A8A]" />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why {COMPANY_INFO.NAME} Stands Out</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just mechanics - we're automotive specialists dedicated to keeping your vehicle performing at its best.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="bg-[#E0E7FF] p-3 rounded-full mr-4 flex-shrink-0">
                  <Shield className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Unmatched Warranty</h3>
                  <p className="text-gray-600 mb-3">Our industry-leading lifetime warranty covers parts and labor on all major repairs.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No mileage limitations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Nationwide coverage</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Transferable to new owners</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Efficient Service</h3>
                  <p className="text-gray-600 mb-3">Our streamlined processes get you back on the road faster without compromising quality.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>90% of services completed same-day</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Real-time service updates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Complimentary shuttle service</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="bg-orange-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                  <p className="text-gray-600 mb-3">Our technicians combine experience with continuous training on the latest technologies.</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Average 15+ years experience</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Factory-certified specialists</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annual training requirements</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/4488645/pexels-photo-4488645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Technician performing vehicle diagnostics"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Our Story</h3>
                  <p className="mb-4">Founded in 1998, we've grown from a small garage to a premier auto service center while maintaining our commitment to personal service.</p>
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-3xl font-bold text-orange-400">25+</p>
                      <p className="text-gray-300">Years Experience</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-400">50K+</p>
                      <p className="text-gray-300">Vehicles Serviced</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Auto Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From routine maintenance to complex repairs, we handle all makes and models with precision.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group border border-gray-100"
                >
                  <div className="bg-[#E0E7FF] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1E3A8A] transition-colors">
                    <Icon className="h-8 w-8 text-[#1E3A8A] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Includes:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Link 
                      to="/signup" 
                      className="text-[#1E3A8A] hover:text-[#152C5E] font-medium transition-colors flex items-center gap-2 group-hover:underline"
                    >
                      Schedule Service
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E3A8A] to-[#152C5E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Service Process</h2>
            <p className="text-xl text-[#93C5FD] max-w-3xl mx-auto">
              Transparent, efficient, and designed with your convenience in mind
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 bg-[#3B82F6]"></div>
            
            {[
              {
                icon: Calendar,
                title: "Schedule Appointment",
                description: "Book online or call to schedule your service at a convenient time"
              },
              {
                icon: Car,
                title: "Vehicle Assessment",
                description: "Thorough inspection and diagnostic testing to identify all needs"
              },
              {
                icon: Settings,
                title: "Service Approval",
                description: "Detailed estimate and approval before any work begins"
              },
              {
                icon: Check,
                title: "Quality Delivery",
                description: "Final inspection and explanation of completed work"
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="bg-gradient-to-b from-[#1D4ED8] to-[#1E40AF] p-8 rounded-xl h-full text-center hover:from-[#1E40AF] hover:to-[#1E3A8A] transition-all shadow-lg">
                  <div className="bg-[#3B82F6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-2 text-orange-400 font-bold">Step {index + 1}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#BFDBFE]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">By The Numbers</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our commitment to excellence is reflected in these metrics that demonstrate our dedication to quality service.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "15,000+", label: "Vehicles Serviced" },
                  { value: "98%", label: "Customer Satisfaction" },
                  { value: "25+", label: "Years Experience" },
                  { value: "50+", label: "Expert Technicians" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-[#EFF6FF] p-6 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="text-4xl font-bold text-[#1E3A8A] mb-2">
                      {stat.value}
                    </div>
                    <p className="text-gray-700 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Modern auto repair shop with multiple service bays"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">State-of-the-Art Facility</h3>
                  <p>Our 15,000 sq ft service center is equipped with the latest diagnostic tools and technology.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-[#E0E7FF]"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                <div className="flex justify-end">
                  <svg className="h-8 w-8 text-[#E0E7FF]" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E3A8A] to-[#152C5E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready for Exceptional Auto Service?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Experience the difference with our professional team and premium service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a 
                  href="#contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#1E3A8A] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions or need to schedule service? Our team is ready to assist you.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", content: COMPANY_INFO.PHONE, link: `tel:${COMPANY_INFO.PHONE}` },
                  { icon: Mail, title: "Email", content: COMPANY_INFO.EMAIL, link: `mailto:${COMPANY_INFO.EMAIL}` },
                  { icon: MapPin, title: "Address", content: COMPANY_INFO.ADDRESS, link: `https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.ADDRESS)}` }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-[#E0E7FF] p-3 rounded-lg mr-4">
                      <item.icon className="h-6 w-6 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#1E3A8A] transition-colors"
                      >
                        {item.content}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between max-w-xs">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between max-w-xs">
                    <span>Saturday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between max-w-xs">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#EFF6FF] p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <div className="h-96 w-full bg-gray-200">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          src="https://maps.google.com/maps?q=223+Jayantha+Mallimarachchi+Mawatha,+Colombo+01400&output=embed"
          title="Location Map"
        ></iframe>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <motion.div whileHover={{ rotate: 10 }}>
                  <Car className="h-8 w-8 text-blue-400 mr-3" />
                </motion.div>
                <span className="text-2xl font-bold text-white">{COMPANY_INFO.NAME}</span>
              </div>
              <p className="mb-4">Premium automotive services with a commitment to excellence.</p>
              <div className="flex space-x-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    )
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.073c0 2.45-.012 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.073c-2.45 0-2.784-.012-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-4.123v-.073c0-2.45.012-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.98 2h.073zm-.073 2h-.073c-2.375 0-2.648.011-3.66.06-.877.024-1.354.114-1.67.22-.337.114-.6.275-.814.495-.22.214-.382.478-.495.814-.106.317-.196.794-.22 1.671-.048 1.016-.06 1.296-.06 3.66v.073c0 2.375.011 2.648.06 3.66.024.877.114 1.354.22 1.67.114.337.274.6.495.814.214.22.478.382.814.495.316.106.793.196 1.671.22 1.016.048 1.296.06 3.66.06h.073c2.375 0 2.648-.011 3.66-.06.877-.024 1.354-.114 1.67-.22.337-.114.6-.275.814-.495.22-.214.382-.478.495-.814.106-.316.196-.793.22-1.671.048-1.016.06-1.296.06-3.66v-.073c0-2.375-.011-2.648-.06-3.66-.024-.877-.114-1.354-.22-1.67-.114-.337-.274-.6-.495-.814a2.51 2.51 0 00-.814-.495c-.316-.106-.793-.196-1.671-.22-1.011-.048-1.296-.06-3.66-.06zM12 8a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm-2.828-1.414a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                      </svg>
                    )
                  },
                  {
                    name: "Twitter",
                    icon: (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    )
                  }
                ].map((social, index) => (
                  <motion.a 
                    key={index}
                    whileHover={{ y: -3, color: "#fff" }}
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      {service.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link>
                </motion.li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                </motion.li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;