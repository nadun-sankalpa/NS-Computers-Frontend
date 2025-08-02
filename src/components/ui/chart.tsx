"use client"

import { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  type LucideIcon,
} from "lucide-react"

// Directly import Recharts components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Types
type ChartType = 'bar' | 'line' | 'pie'
type ChartData = Array<{
  name: string
  value: number
  color?: string
}>

type ChartProps = {
  type: ChartType
  data: ChartData
  width?: number | string
  height?: number | string
  title?: string
  description?: string
  className?: string
}

// Default colors for charts
const COLORS = [
  '#0088FE', // blue
  '#00C49F', // teal
  '#FFBB28', // yellow
  '#FF8042', // orange
  '#8884d8', // purple
  '#82ca9d',  // green
]

// Chart component
export function Chart({
  type = 'bar',
  data,
  width = '100%',
  height = 300,
  title,
  description,
  className = '',
}: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'line':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'pie':
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  // Add a state to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
      <div className="w-full" style={{ height: typeof height === 'number' ? `${height}px` : height }}>
        {data.length > 0 ? (
          renderChart()
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8 text-center">
            {type === 'bar' && <BarChart2 className="h-12 w-12 text-gray-400" />}
            {type === 'line' && <LineChartIcon className="h-12 w-12 text-gray-400" />}
            {type === 'pie' && <PieChartIcon className="h-12 w-12 text-gray-400" />}
            <h3 className="mt-4 text-sm font-medium text-gray-900">No data available</h3>
            <p className="mt-1 text-sm text-gray-500">There is no data to display for this chart.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Chart Icon component
type ChartIconProps = {
  type: ChartType
  className?: string
  size?: number
}

export function ChartIcon({ type, className = '', size = 24 }: ChartIconProps) {
  const Icon: LucideIcon = {
    bar: BarChartIcon,
    line: LineChartIcon,
    pie: PieChartIcon,
  }[type] || BarChartIcon

  return <Icon className={className} size={size} />
}

// Export all chart types as named exports
export { BarChart, LineChart, PieChart } from 'recharts'
