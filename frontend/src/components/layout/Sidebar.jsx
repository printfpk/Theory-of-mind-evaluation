import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Beaker, BarChart3, GitCompare, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Run Experiment", path: "/experiment", icon: <Beaker size={20} /> },
    { name: "Results", path: "/results", icon: <BarChart3 size={20} /> },
    { name: "Model Comparison", path: "/compare", icon: <GitCompare size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> }
  ];

  return (
    <div className="w-64 h-screen bg-[#0f172a] border-r border-[#1e293b] p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10 text-blue-400">
        <Beaker size={28} />
        <h1 className="text-xl font-bold tracking-wide text-white flex-1">ToM Dashboard</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600/20 text-blue-400 font-medium border border-blue-500/20" 
                  : "text-slate-400 hover:bg-[#1e293b] hover:text-white"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}