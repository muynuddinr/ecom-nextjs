'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [cardType, setCardType] = useState<string>('');

  const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value;
      setCardType(detectCardType(formattedValue));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
    
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Order submitted:', formData);
      router.push('/confirmation');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (name: keyof CheckoutFormData, placeholder: string, type = 'text') => (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder=" "
        className={`w-full px-5 py-4 bg-white rounded-xl
          border-2 transition-all duration-300
          focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
          peer placeholder-transparent text-gray-700
          ${errors[name] ? 'border-red-300' : 'border-gray-200'}
          ${name === 'cardNumber' ? 'pr-12' : ''}`}
        disabled={isLoading}
        required
      />
      <label
        className={`absolute left-2 text-sm transition-all duration-300
          peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-5
          peer-focus:text-sm peer-focus:-top-3 peer-focus:left-2
          -top-3 bg-white px-2 rounded-lg font-medium
          ${errors[name] ? 'text-red-500' : 'text-emerald-600'}`}
      >
        {placeholder}
      </label>
      {name === 'cardNumber' && cardType && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Image
            src={`/cards/${cardType}.svg`}
            alt={cardType}
            width={32}
            height={20}
            className="opacity-75"
          />
        </div>
      )}
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {['Cart', 'Details', 'Payment', 'Complete'].map((step, index) => (
            <div key={step} className="flex flex-col items-center relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-300 border-4
                ${index <= 2 
                  ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-500/20' 
                  : 'border-gray-200 bg-gray-50'}`}
              >
                <span className={`text-xl font-bold
                  ${index <= 2 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {index + 1}
                </span>
              </div>
              <span className="mt-4 text-sm font-medium text-gray-600">{step}</span>
              {index < 3 && (
                <div className={`absolute w-[calc(100%-4rem)] h-1 top-8 left-[calc(50%+2rem)]
                  rounded-full ${index <= 1 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Complete Your Purchase</h2>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                {['Personal Information', 'Shipping Details', 'Payment Details'].map((section, index) => (
                  <div key={section} className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600
                        flex items-center justify-center text-sm font-bold border-2 border-emerald-200">
                        {index + 1}
                      </span>
                      {section}
                    </h3>
                    
                    {index === 0 && (
                      <>
                        <div className="grid grid-cols-2 gap-6">
                          {renderInput('firstName', 'First Name')}
                          {renderInput('lastName', 'Last Name')}
                        </div>
                        {renderInput('email', 'Email Address', 'email')}
                      </>
                    )}
                    
                    {index === 1 && (
                      <>
                        {renderInput('address', 'Street Address')}
                        <div className="grid grid-cols-2 gap-6">
                          {renderInput('city', 'City')}
                          {renderInput('zipCode', 'ZIP Code')}
                        </div>
                      </>
                    )}
                    
                    {index === 2 && (
                      <>
                        {renderInput('cardNumber', 'Card Number')}
                        <div className="grid grid-cols-2 gap-6">
                          {renderInput('expiryDate', 'Expiry Date')}
                          {renderInput('cvv', 'CVV')}
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl text-lg font-semibold
                    transition-all duration-300 ease-out transform
                    ${isLoading 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </div>
                  ) : 'Complete Purchase'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-6 h-fit shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-4">
              Order Summary
            </h3>
            <div className="space-y-4 mt-6">
              {[
                { label: 'Subtotal', amount: '$99.99' },
                { label: 'Shipping', amount: '$4.99' },
                { label: 'Tax', amount: '$10.00' }
              ].map(item => (
                <div key={item.label} className="flex justify-between text-gray-600">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.amount}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-emerald-600">$114.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
