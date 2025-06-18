import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';
interface RegisterFormData {
  company_name: string;
  phone: string;
  email: string;
  industry_sector: string;
  turnover_last_fy: number;
  incorporation_date: string;
  cin_number: string;
  pan_number: string;
  gstin: string;
  business_type: string;
}
const INDUSTRY_SECTORS = ['AgriTech', 'Manufacturing', 'IT Services', 'Healthcare', 'Retail', 'Education', 'Financial Services', 'Others'];
const BUSINESS_TYPES = ['Private Limited', 'Public Limited', 'Partnership', 'LLP', 'Proprietorship', 'Others'];
const RegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<RegisterFormData>();
  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // Map frontend fields to backend payload
      const payload = {
        companyName: data.company_name,
        phoneNumber: data.phone,
        email: data.email,
        businessType: data.business_type,
        industrySector: data.industry_sector,
        lastFyTurnover: data.turnover_last_fy,
        incorporationDate: data.incorporation_date,
        cinNumber: data.cin_number,
        panNumber: data.pan_number,
        gstinNumber: data.gstin,
        status: 'pending',
      };
      const response = await fetch('https://credconnect-backend.onrender.com/api/v1/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to register business');
      }
      setIsSuccess(true);
      // Navigate to lender match page after showing success message
      setTimeout(() => {
        navigate('/lender-match', {
          state: {
            businessData: data
          }
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-[#f8faf9] to-white">
      <div className="w-full max-w-2xl">
        {isSuccess ? <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your business has been registered. Redirecting you to matched
              lenders...
            </p>
          </div> : <>
            <div className="text-center mb-8">
              <img src="/Frame_427321370.svg" alt="Jai Kisan" className="h-12 w-auto mx-auto mb-8" />
              <h1 className="text-3xl font-bold text-gray-800">
                Business Registration
              </h1>
              <p className="text-gray-600 mt-2">
                Complete your business profile to get started
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input type="text" id="company_name" {...register('company_name', {
                    required: 'Company name is required'
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.company_name && <p className="mt-1 text-sm text-red-600">
                          {errors.company_name.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="business_type" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Type
                      </label>
                      <select id="business_type" {...register('business_type', {
                    required: 'Business type is required'
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Business Type</option>
                        {BUSINESS_TYPES.map(type => <option key={type} value={type}>
                            {type}
                          </option>)}
                      </select>
                      {errors.business_type && <p className="mt-1 text-sm text-red-600">
                          {errors.business_type.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input type="tel" id="phone" {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input type="email" id="email" {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.email && <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>}
                    </div>
                  </div>
                </div>
                {/* Business Details */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Business Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="industry_sector" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry Sector
                      </label>
                      <select id="industry_sector" {...register('industry_sector', {
                    required: 'Industry sector is required'
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Industry Sector</option>
                        {INDUSTRY_SECTORS.map(sector => <option key={sector} value={sector}>
                            {sector}
                          </option>)}
                      </select>
                      {errors.industry_sector && <p className="mt-1 text-sm text-red-600">
                          {errors.industry_sector.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="turnover_last_fy" className="block text-sm font-medium text-gray-700 mb-1">
                        Last FY Turnover (INR)
                      </label>
                      <input type="number" id="turnover_last_fy" {...register('turnover_last_fy', {
                    required: 'Turnover is required',
                    min: {
                      value: 0,
                      message: 'Turnover must be a positive number'
                    }
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.turnover_last_fy && <p className="mt-1 text-sm text-red-600">
                          {errors.turnover_last_fy.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="incorporation_date" className="block text-sm font-medium text-gray-700 mb-1">
                        Incorporation Date
                      </label>
                      <input type="date" id="incorporation_date" {...register('incorporation_date', {
                    required: 'Incorporation date is required'
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.incorporation_date && <p className="mt-1 text-sm text-red-600">
                          {errors.incorporation_date.message}
                        </p>}
                    </div>
                  </div>
                </div>
                {/* Registration Details */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Registration Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="cin_number" className="block text-sm font-medium text-gray-700 mb-1">
                        CIN Number
                      </label>
                      <input type="text" id="cin_number" {...register('cin_number', {
                    required: 'CIN number is required',
                    pattern: {
                      value: /^[A-Z0-9]{21}$/,
                      message: 'Please enter a valid CIN number'
                    }
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.cin_number && <p className="mt-1 text-sm text-red-600">
                          {errors.cin_number.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="pan_number" className="block text-sm font-medium text-gray-700 mb-1">
                        PAN Number
                      </label>
                      <input type="text" id="pan_number" {...register('pan_number', {
                    required: 'PAN number is required',
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: 'Please enter a valid PAN number'
                    }
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.pan_number && <p className="mt-1 text-sm text-red-600">
                          {errors.pan_number.message}
                        </p>}
                    </div>
                    <div>
                      <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">
                        GSTIN
                      </label>
                      <input type="text" id="gstin" {...register('gstin', {
                    required: 'GSTIN is required',
                    pattern: {
                      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                      message: 'Please enter a valid GSTIN'
                    }
                  })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.gstin && <p className="mt-1 text-sm text-red-600">
                          {errors.gstin.message}
                        </p>}
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full py-3 px-4 bg-[#1B332C] text-white font-medium rounded-md hover:bg-[#234339] focus:outline-none focus:ring-2 focus:ring-[#1B332C] focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Registering...' : 'Register Business'}
                </button>
              </form>
            </div>
          </>}
      </div>
    </div>;
};
export default RegisterPage;