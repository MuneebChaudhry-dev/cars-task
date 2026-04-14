import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Lock, Car } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { FormInput } from './FormInput';
import { SuccessBanner } from './SuccessBanner';
import { SubmitButton } from './SubmitButton';

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

export function ValidatedForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmittingForm(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('=== Form Submitted Successfully ===');
    console.table(data);

    setIsSuccess(true);
    setIsSubmittingForm(false);
    reset();

    // Redirect to dashboard after a short delay so the user sees the success state
    setTimeout(() => {
      navigate({ to: '/dashboard' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl mb-4">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">AutoCenter</h1>
          <p className="text-blue-200 text-sm mt-1">Dealer's Auto Center Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Create your account</h2>
            <p className="text-gray-500 text-sm mb-6">Fill in your details to get started</p>

            {isSuccess && <SuccessBanner />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormInput
                label="Full Name"
                icon={<User className="h-5 w-5" />}
                type="text"
                placeholder="John Doe"
                registration={register('fullName')}
                error={errors.fullName?.message}
              />
              <FormInput
                label="Email Address"
                icon={<Mail className="h-5 w-5" />}
                type="email"
                placeholder="john@example.com"
                registration={register('email')}
                error={errors.email?.message}
              />
              <FormInput
                label="Phone Number"
                icon={<Phone className="h-5 w-5" />}
                type="tel"
                placeholder="+1 (555) 000-0000"
                registration={register('phone')}
                error={errors.phone?.message}
              />
              <FormInput
                label="Password"
                icon={<Lock className="h-5 w-5" />}
                type="password"
                placeholder="••••••••"
                registration={register('password')}
                error={errors.password?.message}
              />

              <div className="pt-2">
                <SubmitButton isLoading={isSubmittingForm} />
              </div>
            </form>
          </div>

          {/* Footer strip */}
          <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 text-center">
            <p className="text-xs text-gray-400">
              After registering you'll be taken to the vehicle dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
