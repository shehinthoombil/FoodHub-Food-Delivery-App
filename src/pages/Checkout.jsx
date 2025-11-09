import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/contexts/context';
import { User, MapPin, Phone, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!orderPlaced && cart.length === 0) {
      navigate('/menu');
    }
  }, [cart, orderPlaced, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please login to checkout</h2>
          <button onClick={() => navigate('/login')} className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your order has been confirmed and will be delivered soon.
          </p>
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Delivery to:</span> {formData.address}, {formData.city} {formData.zipCode}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Contact:</span> {formData.phone}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Payment:</span> {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
            </p>
          </div>
          <button
            onClick={() => {
              setOrderPlaced(false);
              navigate('/');
            }}
            className="w-full bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
          >
            Back to Home
          </button>
          <button
            onClick={() => {
              setOrderPlaced(false);
              navigate('/menu');
            }}
            className="w-full mt-3 bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }


  // Validation 
  const validatePhone = (phone) => {

    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const validateZipCode = (zip) => {
    return /^\d{6}(-\d{4})?$/.test(zip);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'address':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please enter a complete address';
        return '';

      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'City name can only contain letters';
        return '';

      case 'zipCode':
        if (!value.trim()) return 'ZIP code is required';
        if (!validateZipCode(value)) return 'Please enter a valid ZIP code (e.g., 123456)';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!validatePhone(value)) return 'Please enter a valid 10-digit phone number';
        return '';

      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    ['address', 'city', 'zipCode', 'phone'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));


    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      address: true,
      city: true,
      zipCode: true,
      phone: true
    });

    // Validate form
    if (!validateForm()) {

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();

      setOrderPlaced(true);
      setIsSubmitting(false);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const deliveryFee = 3.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your order details below</p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Delivery Informations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-orange-600" />
              Delivery Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 font-medium">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${touched.address && errors.address ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="123 Main Street, Apt 4B"
                />
                {touched.address && errors.address && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.address}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${touched.city && errors.city ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="New York"
                />
                {touched.city && errors.city && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.city}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border ${touched.zipCode && errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="10001"
                  maxLength="10"
                />
                {touched.zipCode && errors.zipCode && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.zipCode}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-orange-600" />
              Payment Method
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-600"
                />
                <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                <span className="text-gray-700 font-medium">Credit/Debit Card</span>
              </label>
              <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${formData.paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-600"
                />
                <svg className="w-5 h-5 ml-3 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-700 font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-gray-600 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-2xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Order...
                </span>
              ) : (
                `Place Order - $${total.toFixed(2)}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
