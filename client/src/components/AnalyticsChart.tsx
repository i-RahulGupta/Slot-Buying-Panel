import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'pie';

interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

interface AnalyticsChartProps {
  title: string;
  data: ChartDataPoint[];
  type: ChartType;
  dataKey?: string;
  dataKey2?: string;
  colors?: string[];
}

const defaultColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AnalyticsChart({
  title,
  data,
  type,
  dataKey = 'value',
  dataKey2,
  colors = defaultColors,
}: AnalyticsChartProps) {
  return (
    <Card data-testid={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={colors[0]}
                  strokeWidth={2}
                  dot={{ fill: colors[0] }}
                />
                {dataKey2 && (
                  <Line
                    type="monotone"
                    dataKey={dataKey2}
                    stroke={colors[1]}
                    strokeWidth={2}
                    dot={{ fill: colors[1] }}
                  />
                )}
              </LineChart>
            ) : type === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
                {dataKey2 && <Bar dataKey={dataKey2} fill={colors[1]} radius={[4, 4, 0, 0]} />}
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey={dataKey}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
