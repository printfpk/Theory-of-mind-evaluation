import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1c] text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <Navbar />
        <main className="flex-1 p-8 max-w-350 mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}