import { useEffect, useMemo } from "react";
import { useExperimentStore } from "../store/experimentStore";
import { BarChart3, TrendingUp, Hash, Award } from "lucide-react";

export default function ModelComparison() {
  const { experiments, loadExperiments, isLoading } = useExperimentStore();

  useEffect(() => {
    loadExperiments();
  }, [loadExperiments]);

  const stats = useMemo(() => {
    if (!experiments || experiments.length === 0) return [];

    const grouped = experiments.reduce((acc, exp) => {
      if (!acc[exp.modelName]) {
        acc[exp.modelName] = { runs: 0, totalScore: 0, passes: 0 };
      }
      acc[exp.modelName].runs += 1;
      acc[exp.modelName].totalScore += exp.consistencyScore;
      if (exp.consistencyScore > 0.5) {
        acc[exp.modelName].passes += 1;
      }
      return acc;
    }, {});

    return Object.keys(grouped).map(modelName => {
      const data = grouped[modelName];
      return {
        modelName,
        runs: data.runs,
        avgScore: data.totalScore / data.runs,
        passRate: (data.passes / data.runs) * 100
      };
    }).sort((a, b) => b.passRate - a.passRate);
  }, [experiments]);

  if (isLoading) {
    return <div className="text-slate-400 animate-pulse">Computing comparisons...</div>;
  }

  if (stats.length === 0) {
    return <div className="text-slate-400">No experiments available to compare.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Model Leaderboard</h2>
        <p className="text-slate-400">Compare how different models perform across all Theory of Mind scenarios.</p>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f172a]/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Award size={14}/> Rank & Model</div></th>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><Hash size={14}/> Total Runs</div></th>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><BarChart3 size={14}/> Mean Consistency</div></th>
                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-2"><TrendingUp size={14}/> Pass Rate</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stats.map((stat, idx) => (
                <tr key={stat.modelName} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-amber-500/20 text-amber-400' : idx === 1 ? 'bg-slate-300/20 text-slate-300' : idx === 2 ? 'bg-amber-700/20 text-amber-600' : 'bg-slate-800 text-slate-500'}`}>
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-200">{stat.modelName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-300">
                    <span className="bg-slate-800 px-2.5 py-1 rounded-md text-xs font-medium">{stat.runs} tests</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full" 
                          style={{ width: `${stat.avgScore * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-300">
                        {(stat.avgScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <span className={`text-sm font-bold ${stat.passRate >= 80 ? 'text-emerald-400' : stat.passRate >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {stat.passRate.toFixed(1)}%
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}