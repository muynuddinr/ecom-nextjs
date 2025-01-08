'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import img from '../../../public/womens.jpg';
import Image from 'next/image';

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PasswordValidations {
  hasLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

interface FormValidations {
  password: PasswordValidations;
  email: boolean;
  phoneNumber: boolean;
  passwordsMatch: boolean;
}

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    acceptTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Enhanced validation state
  const [validations, setValidations] = useState<FormValidations>({
    password: {
      hasLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecial: false,
    },
    email: true,
    phoneNumber: true,
    passwordsMatch: true,
  });

  // Add validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidations(prev => ({
      ...prev,
      email: emailRegex.test(email)
    }));
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    setValidations(prev => ({
      ...prev,
      phoneNumber: phoneRegex.test(phone)
    }));
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    setValidations(prev => ({
      ...prev,
      passwordsMatch: password === confirmPassword
    }));
  };

  const validatePassword = (password: string) => {
    setValidations(prev => ({
      ...prev,
      password: {
        hasLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Add validation checks
    switch (name) {
      case 'password':
        validatePassword(value);
        validatePasswordMatch(value, formData.confirmPassword);
        break;
      case 'confirmPassword':
        validatePasswordMatch(formData.password, value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'phoneNumber':
        validatePhone(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validations.email) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!validations.phoneNumber) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (!validations.passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }
    if (!Object.values(validations.password).every(Boolean)) {
      toast.error('Please meet all password requirements');
      return;
    }
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Account created successfully!');
        router.push('/login');
        router.refresh();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-red-100 to-white p-4">
      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 bg-white/50">
            <div className="mb-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-600 mt-2 text-lg">Join our creative community</p>
            </div>

            {/* Social Login Buttons */}
            <div className="mb-8">
              <button className="w-full flex items-center justify-center gap-2 p-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 hover:border-red-200 text-gray-700 shadow-sm">
                <FcGoogle className="w-5 h-5" />
                <span className="font-medium">Continue with Google</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-8">
              <div className="border-t w-full border-gray-200"></div>
              <span className="absolute px-4 text-sm text-gray-500 bg-white/80 rounded-full">or continue with</span>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Email & Phone Fields */}
              <InputField
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              {/* Password Fields */}
              <div className="space-y-4">
                <div className="relative">
                  <InputField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <div className="relative">
                  <InputField
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                
                {!validations.passwordsMatch && formData.confirmPassword && (
                  <p className="text-red-500 text-sm">Passwords do not match</p>
                )}
              </div>

              {/* Password Strength Indicators */}
              <div className="space-y-2">
                <PasswordStrengthIndicator validations={validations.password} />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-5 w-5 rounded-lg border-gray-300 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-600">
                  I accept the <a href="#" className="text-red-600 hover:text-red-500">Terms and Conditions</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 rounded-2xl text-white font-medium bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-red-500/20"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-700">
              Already have an account?{' '}
              <Link href="/login" className="text-red-600 hover:text-red-500 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden md:block w-1/2 relative">
            <Image
              src={img.src}
              alt="Abstract Art"
              className="h-full w-full object-cover"
              width={img.width}
              height={img.height}
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="max-w-md text-center bg-black/30 p-8 rounded-3xl backdrop-blur-sm">
                <h3 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
                  Welcome to Our Community
                </h3>
                <p className="text-xl text-white/90 font-medium drop-shadow-md">
                  Where creativity meets innovation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InputField = ({ name, type = "text", placeholder, value, onChange }: InputFieldProps) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-700 placeholder-gray-400 shadow-sm"
  />
);

const PasswordStrengthIndicator = ({ validations }: { validations: PasswordValidations }) => (
  <div className="space-y-1 bg-white/80 p-4 rounded-2xl border border-gray-200">
    <div className="text-sm text-gray-600 mb-2 font-medium">Password Requirements:</div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      {Object.entries(validations).map(([key, value]) => (
        <div key={key} className={`flex items-center gap-2 ${value ? 'text-red-600' : 'text-gray-400'}`}>
          <div className={`w-2 h-2 rounded-full ${value ? 'bg-red-600' : 'bg-gray-300'}`} />
          {key === 'hasLength' && 'At least 8 characters'}
          {key === 'hasUppercase' && 'Uppercase letter'}
          {key === 'hasLowercase' && 'Lowercase letter'}
          {key === 'hasNumber' && 'Number'}
          {key === 'hasSpecial' && 'Special character'}
        </div>
      ))}
    </div>
  </div>
);

export default Register;
