import { AlertCircle } from 'lucide-react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { type ReactNode } from 'react';

interface FormInputProps {
  label: string;
  icon: ReactNode;
  type: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export function FormInput({
  label,
  icon,
  type,
  placeholder,
  registration,
  error,
}: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 block">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`}>
            {icon}
          </span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
            error
              ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
          }`}
          {...registration}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
