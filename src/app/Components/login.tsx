'use client'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import img from '../../../public/womens.jpg';

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Logged in successfully!');
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
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
                Welcome Back
              </h2>
              <p className="text-gray-600 mt-2 text-lg">Sign in to your account</p>
            </div>

            {/* Social Login Button */}
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />

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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-5 w-5 rounded-lg border-gray-300 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-500">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 rounded-2xl text-white font-medium bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-red-500/20"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-gray-700">
              Don't have an account?{' '}
              <Link href="/register" className="text-red-600 hover:text-red-500 font-medium transition-colors">
                Create account
              </Link>
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden md:block w-1/2 relative">
            <img
              src={img.src}
              alt="Abstract Art"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="max-w-md text-center bg-black/30 p-8 rounded-3xl backdrop-blur-sm">
                <h3 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
                  Welcome Back
                </h3>
                <p className="text-xl text-white/90 font-medium drop-shadow-md">
                  Continue your creative journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component
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

export default Login;
