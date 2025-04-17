import React from 'react';
import {
  LineChart,
  Line,
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

  const parsedData = hasData
    ? data.map((item) => ({
        ...item,
        Year: String(item.Year),
        "Early Years": parseFloat(item["Early Years"] || 0),
      }))
    : [];

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-2">(NoR)</h2>

      {!hasData ? (
        <div className="text-gray-500">
          Data is currently unavailable. The chart will appear once connection to Microsoft Fabric is finalised.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Early Years"
              stroke="#3B82F6" // Tailwind blue-500
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default NoRChart;