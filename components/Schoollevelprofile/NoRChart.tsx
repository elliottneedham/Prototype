import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type NoRChartProps = {
  data: any[];
};

const NoRChart = ({ data }: NoRChartProps) => {
  const hasData = Array.isArray(data) && data.length > 0;

  // Fixed Power BI categories
  const categories = [
    "Early Years",
    "Infant",
    "Junior",
    "Secondary",
    "Post 16"
  ];

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-2">Historic/Projected NoR</h2>

      {!hasData ? (
        <div className="text-gray-500 animate-pulse">Loading data…</div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} stackOffset="none">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis
              tickFormatter={(val) => `${(val / 1_000_000).toFixed(1)}M`}
              domain={[0, 9_000_000]} // adjust upper bound if needed
            />
            <Tooltip
              formatter={(value: number, name: string) =>
                `${(value as number).toLocaleString()} pupils — ${name}`
              }
            />
            <Legend />
            {categories.map((group, index) => (
              <Area
                key={group}
                type="monotone"
                dataKey={group}
                stackId="1"
                fill={`hsl(${index * 60}, 70%, 60%)`}
                stroke="none"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default NoRChart;