import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
  } from "recharts";
  
  const data = [
    { name: "Exp1", score: 0.2 },
    { name: "Exp2", score: 0.4 },
    { name: "Exp3", score: 0.35 },
    { name: "Exp4", score: 0.5 }
  ];
  
  export default function SDMChart() {
    return (
      <div className="h-65 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dx={-10}
            />
            <Tooltip 
              cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }} 
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#0a0f1c' }} 
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#10b981' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }