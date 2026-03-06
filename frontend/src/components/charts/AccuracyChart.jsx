import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
  } from "recharts";
  
  const data = [
    { name: "Exp1", accuracy: 80 },
    { name: "Exp2", accuracy: 85 },
    { name: "Exp3", accuracy: 75 },
    { name: "Exp4", accuracy: 90 }
  ];
  
  export default function AccuracyChart() {
    return (
      <div className="h-65 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
              cursor={{fill: '#1e293b', opacity: 0.4}}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }} 
            />
            <Bar dataKey="accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }