interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

export function StepIndicator({ number, label, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-10 h-10 rounded-md flex items-center justify-center font-semibold text-sm
          transition-all duration-200
          ${completed ? 'bg-ee-gold text-black' : ''}
          ${active && !completed ? 'border-2 border-ee-gold/30 text-ee-gold bg-white/[0.02]' : ''}
          ${!active && !completed ? 'border border-white/5 text-gray-500 bg-white/[0.02]' : ''}
        `}
      >
        {completed ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>
      <span className={`text-xs mt-2 font-medium transition-colors ${active ? 'text-white' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}
