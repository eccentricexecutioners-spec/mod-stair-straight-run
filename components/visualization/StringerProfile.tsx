'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfilePoint {
  nosing_x?: number;
  nosing_y?: number;
  nosing_z?: number;
}

export function StringerProfile({ data }: { data: ProfilePoint[] }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-8">No profile data available</p>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="nosing_x"
            label={{ value: 'Run (mm)', position: 'insideBottom', offset: -5, fill: '#6b7280' }}
            stroke="rgba(255,255,255,0.05)"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis
            dataKey="nosing_z"
            label={{ value: 'Rise (mm)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            stroke="rgba(255,255,255,0.05)"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#D4A574' }}
          />
          <Line
            type="linear"
            dataKey="nosing_z"
            stroke="#D4A574"
            strokeWidth={2}
            dot={{ fill: '#D4A574', r: 3, stroke: '#D4A574' }}
            name="Height"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
