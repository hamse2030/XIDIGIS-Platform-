"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

const data = [
  { month: 'JAN', value: 45 },
  { month: 'FEB', value: 52 },
  { month: 'MAR', value: 48 },
  { month: 'APR', value: 30 },
  { month: 'MAY', value: 25 },
  { month: 'JUN', value: 18 },
  { month: 'JUL', value: 22 },
];

const barData = [
  { name: 'Sool', val: 78 },
  { name: 'Sanaag', val: 62 },
  { name: 'Togdheer', val: 84 },
  { name: 'Awdal', val: 45 },
];

export default function DroughtDashboard() {
  return (
    <div className="space-y-12">
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891B2" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} 
            />
            <YAxis 
              hide 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', fontSize: '10px', color: '#0F172A' }}
              itemStyle={{ color: '#0891B2' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0891B2" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 9, fontWeight: 700 }} 
            />
            <Tooltip 
               cursor={{ fill: '#F1F5F9' }}
               contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
            />
            <Bar dataKey="val" radius={[2, 2, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.val > 70 ? '#E11D48' : '#0891B2'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
