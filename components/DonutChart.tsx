"use client";

import { PieChart as RechartsPieChart, Pie, Cell } from "recharts";

interface DonutChartProps {
  value: number;
}

const DonutChart = ({ value }: DonutChartProps) => {
  const dataDonutChart = [
    { name: "Desempenho", value: value },
    { name: "Restante", value: 100 - value },
  ];

  const COLORS = ["#0088FE", "#F0F0F0"];

  return (
    <div className="flex justify-center">
      <RechartsPieChart width={200} height={200}>
        <Pie
          data={dataDonutChart}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
        >
          {dataDonutChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Rótulo central */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-bold"
          >
            {value.toFixed(2)}%
          </text>
        </Pie>
      </RechartsPieChart>
    </div>
  );
};

export default DonutChart;
