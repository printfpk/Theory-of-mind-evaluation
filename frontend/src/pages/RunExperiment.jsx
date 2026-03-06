import { useState } from "react";
import { Play, Settings2, Sparkles } from "lucide-react";

export default function RunExperiment() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-4-turbo");

  const handleRun = () => {
    console.log("Running experiment...", { model, prompt });
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Run ToM Experiment</h2>
        <p className="text-slate-400">Configure parameters and evaluate model Theory of Mind capabilities.</p>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Top Controls */}
        <div className="p-6 border-b border-slate-800/80 bg-[#0f172a]/50 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex-1 min-w-50">
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Select Model</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-white"
            >
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="llama-3-70b">Llama 3 (70B)</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-50">
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Evaluation Type</label>
            <select className="w-full bg-[#1e293b] border border-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white">
              <option>False Belief Task</option>
              <option>Faux Pas Task</option>
              <option>Hidden Emotion Task</option>
              <option>Custom Scenario</option>
            </select>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-300">Scenario Prompt</label>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              <Sparkles size={14} /> Generate Example
            </button>
          </div>
          
          <textarea
            className="w-full p-5 bg-[#0f172a] border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-y min-h-50"
            placeholder="Enter the scenario narrative here. e.g., 'Sally puts her marble in the basket. She leaves the room. Anne moves the marble to the box. Sally returns...'"
            onChange={(e)=>setPrompt(e.target.value)}
            value={prompt}
          />
        </div>

        {/* Action Bar */}
        <div className="p-6 pt-2 flex items-center justify-between">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
            <Settings2 size={18} /> Advanced Options
          </button>

          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] active:scale-[0.98]"
            onClick={handleRun}
          >
            <Play size={18} fill="currentColor" /> Run Evaluation
          </button>
        </div>

      </div>
    </div>
  );
}