import { CheckCircle2 } from 'lucide-react';

export function SuccessBanner() {
  return (
    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
      <div>
        <h3 className="text-sm font-medium text-green-800">Success!</h3>
        <p className="text-sm text-green-700 mt-1">
          Your form has been successfully submitted. Check the console for data logging.
        </p>
      </div>
    </div>
  );
}
