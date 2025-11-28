interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  showMilestones?: boolean;
}

export default function ProgressBar({ value, max, label, showPercentage = true, showMilestones = false }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const isWarning = percentage >= 80 && percentage < 100;
  const isComplete = percentage >= 100;

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className={`text-sm font-medium ${
              isComplete ? 'text-green-600 dark:text-green-400' :
              isWarning ? 'text-yellow-600 dark:text-yellow-400' :
              'text-foreground'
            }`}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden relative">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            isComplete ? 'bg-green-500' :
            isWarning ? 'bg-yellow-500' :
            'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
          data-testid="progress-bar-fill"
        />
        {showMilestones && (
          <>
            <div className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/30" style={{ left: '80%' }} />
            <div className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/30" style={{ left: '100%' }} />
          </>
        )}
      </div>
      {showMilestones && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">0%</span>
          <span className="text-xs text-muted-foreground">80%</span>
          <span className="text-xs text-muted-foreground">100%</span>
        </div>
      )}
    </div>
  );
}
