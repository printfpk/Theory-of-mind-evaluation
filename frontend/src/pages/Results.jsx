import { useEffect } from "react";
import { useExperimentStore } from "../store/experimentStore";
import { Brain, MessageSquare, CheckCircle, XCircle } from "lucide-react";

export default function Results() {
  const { experiments, loadExperiments, isLoading } = useExperimentStore();

  useEffect(() => {
    loadExperiments();
  }, [loadExperiments]);

  if (isLoading) {
    return <div className="text-slate-400 animate-pulse">Loading results...</div>;
  }

  if (!experiments || experiments.length === 0) {
    return <div className="text-slate-400">No results found. Run an experiment first!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Detailed Experiment Results</h2>
        <p className="text-slate-400">Review full transcripts of model responses and consistency evaluations.</p>
      </div>

      <div className="space-y-6">
        {experiments.map((exp, idx) => {
          const isConsistent = exp.consistencyScore > 0.5;
          const scoreColor = isConsistent ? "text-emerald-400" : "text-rose-400";
          
          return (
            <div key={exp._id || idx} className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-800/80 bg-[#0f172a]/50 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-xs font-bold tracking-wide uppercase">
                    {exp.modelName}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {new Date(exp.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-slate-300 text-sm mr-2">Consistency Score:</span>
                  <span className={`flex items-center gap-1 ${scoreColor}`}>
                    {isConsistent ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {(exp.consistencyScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Scenario Block */}
                <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                    <Brain size={16} className="text-indigo-400"/> Scenario Context
                  </h4>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {exp.scenarioId?.story || "N/A"}
                  </p>
                </div>

                {/* Q&A Block */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-400">
                      <MessageSquare size={16} /> Question 1: Belief Prompt
                    </div>
                    <div className="text-xs text-slate-500 italic px-2 border-l-2 border-slate-700">
                      "What does the character believe?"
                    </div>
                    <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 text-sm text-slate-300 shadow-inner h-full min-h-[120px] whitespace-pre-wrap">
                      {exp.beliefResponse || "No response recorded."}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
                      <MessageSquare size={16} /> Question 2: Action Prompt
                    </div>
                    <div className="text-xs text-slate-500 italic px-2 border-l-2 border-slate-700">
                      "What action will the character take?"
                    </div>
                    <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 text-sm text-slate-300 shadow-inner h-full min-h-[120px] whitespace-pre-wrap">
                      {exp.actionResponse || "No response recorded."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}