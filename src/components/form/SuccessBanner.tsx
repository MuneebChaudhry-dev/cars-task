import { CheckCircle2, ArrowRight } from 'lucide-react';

export function SuccessBanner() {
  return (
    <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-emerald-800">Registration successful!</h3>
        <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
          Redirecting to dashboard
          <ArrowRight className="w-3 h-3 animate-pulse" />
        </p>
      </div>
    </div>
  );
}
