import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// Zod Schema Verification
const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9+\-\s()]*$/, 'Invalid characters in phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

export const Route = createFileRoute('/form')({
  component: ValidatedForm,
});

export function ValidatedForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Validates on change and blur for real-time inline errors
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmittingForm(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('=== Form Submitted Successfully ===');
    console.table(data);

    setIsSuccess(true);
    setIsSubmittingForm(false);
    reset(); // Reset form after success

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100'>
        <div className='bg-blue-600 p-6 text-center'>
          <h2 className='text-2xl font-bold text-white'>Create Account</h2>
          <p className='text-blue-100 mt-2 text-sm'>
            Please fill in your details to continue
          </p>
        </div>

        <div className='p-8'>
          {isSuccess && (
            <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3'>
              <CheckCircle2 className='w-5 h-5 text-green-600 shrink-0 mt-0.5' />
              <div>
                <h3 className='text-sm font-medium text-green-800'>Success!</h3>
                <p className='text-sm text-green-700 mt-1'>
                  Your form has been successfully submitted. Check the console
                  for data logging.
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-5'
            noValidate
          >
            {/* Full Name Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-gray-700 block'>
                Full Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User
                    className={`h-5 w-5 ${errors.fullName ? 'text-red-400' : 'text-gray-400'}`}
                  />
                </div>
                <input
                  type='text'
                  placeholder='John Doe'
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && (
                <p className='text-red-500 text-xs flex items-center gap-1 mt-1 font-medium'>
                  <AlertCircle className='w-3.5 h-3.5' />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-gray-700 block'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail
                    className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`}
                  />
                </div>
                <input
                  type='email'
                  placeholder='john@example.com'
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className='text-red-500 text-xs flex items-center gap-1 mt-1 font-medium'>
                  <AlertCircle className='w-3.5 h-3.5' />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-gray-700 block'>
                Phone Number
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Phone
                    className={`h-5 w-5 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`}
                  />
                </div>
                <input
                  type='tel'
                  placeholder='+1 (555) 000-0000'
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className='text-red-500 text-xs flex items-center gap-1 mt-1 font-medium'>
                  <AlertCircle className='w-3.5 h-3.5' />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className='space-y-1'>
              <label className='text-sm font-medium text-gray-700 block'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock
                    className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`}
                  />
                </div>
                <input
                  type='password'
                  placeholder='••••••••'
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs flex items-center gap-1 mt-1 font-medium'>
                  <AlertCircle className='w-3.5 h-3.5' />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isSubmittingForm}
              className='w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex justify-center items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed active:scale-[0.98]'
            >
              {isSubmittingForm ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Submitting Form...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
