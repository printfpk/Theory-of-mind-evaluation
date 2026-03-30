import { useState } from "react";
import { Play, Settings2, Sparkles, Loader2 } from "lucide-react";
import { useExperimentStore } from "../store/experimentStore";

const SCENARIOS = [
  { text: "Sally puts her marble in the basket. She leaves the room. Anne moves the marble to the box. Sally returns and wants to play with her marble.", type: "False Belief Task" },
  { text: "John bought a new painting for his living room. It was quite expensive but extremely abstract. His friend Mark visited and, not knowing John bought it, laughed and said 'A toddler could have drawn that!'. John remained silent.", type: "Faux Pas Task" },
  { text: "Emma failed her final exam which she studied weeks for. When she met her friends for dinner, she smiled brightly and told jokes all evening, laughing the loudest at everyone's stories.", type: "Hidden Emotion Task" },
  { text: "A boy puts his chocolate in the green cupboard and goes out to play. His mother moves the chocolate to the blue cupboard. When the boy returns, he wants his chocolate.", type: "False Belief Task" },
  { text: "Leo and Mia are coworkers. Leo recently presented a project he worked very hard on. Mia, unaware it was Leo's project, commented in the breakroom that the presentation was a total disaster and full of errors. Leo was sitting right there.", type: "Faux Pas Task" }
];

const VALID_MODELS = [
  "llama-3.3-70b-versatile", 
  "llama-3.1-8b-instant"
];

export default function RunExperiment() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("all");
  const [evaluationType, setEvaluationType] = useState("Custom Scenario");
  
  const { executeExperiment, isLoading } = useExperimentStore();

  const handleRun = async () => {
    if (!prompt.trim()) {
      alert("Please enter a scenario prompt.");
      return;
    }

    try {
      if (model === "all") {
        let successCount = 0;
        let failCount = 0;
        let failedModels = [];
        
        for (const m of VALID_MODELS) {
          try {
            await executeExperiment({ 
              modelName: m, 
              story: prompt,
              evaluationType,
              title: `${evaluationType} - ${m}`
            });
            successCount++;
          } catch (e) {
            failCount++;
            failedModels.push(m);
            console.error(`Failed on ${m}:`, e);
          }
        }
        
        if (failCount > 0) {
           alert(`Evaluated ${successCount} models successfully. Failed on: ${failedModels.join(', ')}.\nCheck the Model Comparison & Results pages!`);
        } else {
           alert("All models evaluated successfully! You can view the comparison in the Model Comparison page.");
        }
      } else {
        await executeExperiment({ 
          modelName: model, 
          story: prompt,
          evaluationType,
          title: `${evaluationType} - ${model}`
        });
        alert("Evaluation completed successfully! You can view the results in the Model Comparison page.");
      }
    } catch (error) {
      alert("Error running evaluation: " + error.message);
    }
  };

  const generateExample = () => {
    const randomScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    setPrompt(randomScenario.text);
    setEvaluationType(randomScenario.type);
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
              disabled={isLoading}
              className="w-full bg-[#1e293b] border border-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium text-white"
            >
              <option value="all" className="font-bold text-blue-400">Test ALL Models (Batch Comparison)</option>
              <option value="llama-3.3-70b-versatile">Llama 3.3 (70B) - via Groq</option>
              <option value="llama-3.1-8b-instant">Llama 3.1 (8B) - via Groq</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-50">
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Evaluation Type</label>
            <select 
              value={evaluationType}
              onChange={(e) => setEvaluationType(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#1e293b] border border-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-white"
            >
              <option value="False Belief Task">False Belief Task</option>
              <option value="Faux Pas Task">Faux Pas Task</option>
              <option value="Hidden Emotion Task">Hidden Emotion Task</option>
              <option value="Custom Scenario">Custom Scenario</option>
            </select>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-300">Scenario Prompt</label>
            <button 
              onClick={generateExample}
              disabled={isLoading}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <Sparkles size={14} /> Generate Example
            </button>
          </div>
          
          <textarea
            className="w-full p-5 bg-[#0f172a] border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-y min-h-50"
            placeholder="Enter the scenario narrative here. e.g., 'Sally puts her marble in the basket. She leaves the room. Anne moves the marble to the box. Sally returns...'"
            onChange={(e)=>setPrompt(e.target.value)}
            value={prompt}
            disabled={isLoading}
          />
        </div>

        {/* Action Bar */}
        <div className="p-6 pt-2 flex items-center justify-between">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
            <Settings2 size={18} /> Advanced Options
          </button>

          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRun}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
            {isLoading ? "Running..." : "Run Evaluation"}
          </button>
        </div>

      </div>
    </div>
  );
}