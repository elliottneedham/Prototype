import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type SENChartProps = {
  data: any[];
};

const SENChart = ({ data }: SENChartProps) => {
  const hasData = Array.isArray(data) && data.length > 0;

  const grouped = hasData
    ? data.reduce((acc, row) => {
        const year = row["Year"];
        const need = row["Primary_Need"];
        const status = row["SEN_Status"];
        const pupils = parseInt(row["Pupils"], 10) || 0;

        if (!year || !need || !status) return acc;

        const key = `${status} - ${need}`;
        if (!acc[year]) acc[year] = { Year: year };
        acc[year][key] = (acc[year][key] || 0) + pupils;

        return acc;
      }, {} as Record<string, any>)
    : {};

  const parsedData = Object.values(grouped);
  const uniqueKeys = hasData
    ? Array.from(
        new Set(data.map((row) => `${row["SEN_Status"]} - ${row["Primary_Need"]}`))
      ).sort()
    : [];

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-2">SEN Pupils by Primary Need</h2>

      {!hasData ? (
        <div className="text-gray-500 animate-pulse">Loading data…</div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {uniqueKeys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                fill={`hsl(${(i * 40) % 360}, 60%, 60%)`}
                stroke="none"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SENChart;