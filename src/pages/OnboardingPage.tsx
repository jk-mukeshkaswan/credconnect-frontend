import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from 'lucide-react';
interface FormData {
  businessName: string;
  gstNumber: string;
  panNumber: string;
}
const OnboardingPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // API call would go here
      // const response = await fetch('/api/onboarding', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      setIsSuccess(true);
      // Navigate to lender match page after showing success message


      const response = await fetch('http://localhost:5000/api/match-lenders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      navigate('/lender-match', {
        state: {
          businessData: data,
          matchedLenders: result.lenders,
        }
      });
      
      // setTimeout(() => {
      //   navigate('/lender-match', {
      //     state: {
      //       businessData: data
      //     }
      //   });
      // }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        {isSuccess ? <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-4">
              Your business information has been received. Redirecting you to
              matched lenders...
            </p>
          </div> : <>
            <div className="text-center mb-8">
              <img src="/Frame_427321370.svg" alt="Jai Kisan" className="h-12 w-auto mx-auto mb-8" />
              <h1 className="text-3xl font-bold text-gray-800">
                Business Loan Application
              </h1>
              <p className="text-gray-600 mt-2">
                Please provide your business details to find matching lenders
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">
                    Business Name
                  </label>
                  <input id="businessName" type="text" className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your business name" {...register('businessName', {
                required: 'Business name is required'
              })} />
                  {errors.businessName && <p className="mt-1 text-red-500 text-sm">
                      {errors.businessName.message}
                    </p>}
                </div>
                <div className="mb-5">
                  <label htmlFor="gstNumber" className="block text-gray-700 font-medium mb-2">
                    GST Number
                  </label>
                  <input id="gstNumber" type="text" className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gstNumber ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g. 22AAAAA0000A1Z5" {...register('gstNumber', {
                required: 'GST number is required',
                pattern: {
                  value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: 'Please enter a valid GST number'
                }
              })} />
                  {errors.gstNumber && <p className="mt-1 text-red-500 text-sm">
                      {errors.gstNumber.message}
                    </p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="panNumber" className="block text-gray-700 font-medium mb-2">
                    PAN Number
                  </label>
                  <input id="panNumber" type="text" className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g. ABCDE1234F" {...register('panNumber', {
                required: 'PAN number is required',
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: 'Please enter a valid PAN number'
                }
              })} />
                  {errors.panNumber && <p className="mt-1 text-red-500 text-sm">
                      {errors.panNumber.message}
                    </p>}
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </>}
      </div>
    </div>;
};
export default OnboardingPage;