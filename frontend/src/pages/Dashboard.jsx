import { useEffect } from "react";
import AccuracyChart from "../components/charts/AccuracyChart";
import SDMChart from "../components/charts/SDMChart";
import { Activity, Target, BrainCircuit, Plus } from "lucide-react";
import { useExperimentStore } from "../store/experimentStore";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { experiments, loadExperiments, isLoading } = useExperimentStore();

  useEffect(() => {
    loadExperiments();
  }, [loadExperiments]);

  const totalExperiments = experiments.length;
  // Calculate a mock average for now based on actual data sizes if needed
  const averageConsistency = totalExperiments > 0 
      ? (experiments.reduce((acc, curr) => acc + (curr.consistencyScore || 0), 0) / totalExperiments).toFixed(2) 
      : 0;

  const stats = [
    { title: "Total Experiments", value: isNaN(totalExperiments) ? "0" : totalExperiments, change: "+12%", isNegative: false, icon: <Activity className="text-blue-400" size={24}/> },
    { title: "Avg Consistency Score", value: isNaN(averageConsistency) ? "0" : averageConsistency, change: "+3.2%", isNegative: false, icon: <Target className="text-emerald-400" size={24}/> },
    { title: "Avg FTI Score", value: "0.72", change: "-0.05%", isNegative: true, icon: <BrainCircuit className="text-purple-400" size={24} /> }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Platform Overview</h2>
          <p className="text-slate-400 text-sm">Monitor your LLM Theory of Mind evaluation metrics in real-time.</p>
        </div>
        <Link to="/run" className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] active:scale-95 text-sm">
          <Plus size={16} strokeWidth={3} /> New Experiment
        </Link>
      </div>

      {isLoading ? (
        <div className="text-slate-400">Loading metrics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  {stat.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm ${stat.isNegative ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                  {stat.change}
                </span>
              </div>
              
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white">Model Accuracy</h3>
            <select className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
          <AccuracyChart />
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white">SDM Divergence</h3>
            <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">View Details →</button>
          </div>
          <SDMChart />
        </div>
      </div>
    </div>
  );
}