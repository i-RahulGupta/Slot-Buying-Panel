import AnalyticsChart from '../AnalyticsChart';

// todo: remove mock functionality
const mockData = [
  { name: 'Jan', value: 4000, value2: 2400 },
  { name: 'Feb', value: 3000, value2: 1398 },
  { name: 'Mar', value: 2000, value2: 9800 },
  { name: 'Apr', value: 2780, value2: 3908 },
  { name: 'May', value: 1890, value2: 4800 },
  { name: 'Jun', value: 2390, value2: 3800 },
];

export default function AnalyticsChartExample() {
  return (
    <div className="max-w-lg">
      <AnalyticsChart
        title="Monthly Revenue"
        data={mockData}
        type="line"
        dataKey="value"
        dataKey2="value2"
      />
    </div>
  );
}
