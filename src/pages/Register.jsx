import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/contexts/context';
import { User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const Register = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate name (only letter and space)
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return null;
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
    return 'medium';
  };

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!isValidName(value)) return 'Name can only contain letters and spaces';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';

      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';

      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle input blur (when user leaves field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Store user data in localStorage via context
      login({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase()
      });

      setIsSubmitting(false);

      navigate('/');
    }, 800);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="John Doe"
                />
              </div>
              {touched.name && errors.name && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="john@example.com"
                />
              </div>
              {touched.email && errors.email && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="••••••••"
                />
              </div>

              {/* Password Strength Indicator */}
              {passwordStrength && !errors.password && formData.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    <div className={`h-1.5 flex-1 rounded transition-all ${passwordStrength === 'weak' ? 'bg-red-500' :
                      passwordStrength === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                    <div className={`h-1.5 flex-1 rounded transition-all ${passwordStrength === 'medium' || passwordStrength === 'strong' ?
                      passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500' :
                      'bg-gray-200'
                      }`}></div>
                    <div className={`h-1.5 flex-1 rounded transition-all ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                  </div>
                  <p className={`text-xs mt-1 font-medium ${passwordStrength === 'weak' ? 'text-red-500' :
                    passwordStrength === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                    Password strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                  </p>
                </div>
              )}

              {touched.password && errors.password && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}

              {/* Password Requirements */}
              {!errors.password && formData.password.length > 0 && formData.password.length < 6 && (
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters required
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 border ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' :
                    touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'border-green-500' :
                      'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
                  placeholder="••••••••"
                />
              </div>

              {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Passwords match
                </div>
              )}

              {/* Error Message */}
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-orange-600 hover:text-orange-700 font-medium transition"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
