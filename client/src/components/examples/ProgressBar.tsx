import ProgressBar from '../ProgressBar';

export default function ProgressBarExample() {
  return (
    <div className="space-y-6 w-full max-w-md">
      <ProgressBar value={45} max={100} label="Monthly Target" showMilestones />
      <ProgressBar value={85} max={100} label="Warning Level" showMilestones />
      <ProgressBar value={100} max={100} label="Target Achieved" showMilestones />
    </div>
  );
}
