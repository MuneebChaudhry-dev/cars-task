import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
}

export function SubmitButton({ isLoading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex justify-center items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed active:scale-[0.98]"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Submitting Form...
        </>
      ) : (
        'Complete Registration'
      )}
    </button>
  );
}
