import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Lock } from 'lucide-react';
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

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-blue-100 mt-2 text-sm">
            Please fill in your details to continue
          </p>
        </div>

        <div className="p-8">
          {isSuccess && <SuccessBanner />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

            <SubmitButton isLoading={isSubmittingForm} />
          </form>
        </div>
      </div>
    </div>
  );
}
