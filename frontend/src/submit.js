import { useState } from "react";
import { useStore } from "./store";
import { X, CheckCircle2, XCircle, Activity, Layers, Share2 } from "lucide-react";

export const SubmitButton = () => {

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://vectorshift-assignment-8sw4.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nodes,
            edges
          })
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setModalData(data);
      setModalOpen(true);
      
    } catch (error) {
      setError(error.message);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
<button
  onClick={submit}
  disabled={loading}
  className={`group relative flex items-center justify-center gap-2 px-7 py-3 rounded-xl 
  bg-gradient-to-r from-indigo-500 to-purple-600 
  text-white font-medium tracking-wide
  transition-all duration-300
  hover:scale-[1.03] hover:shadow-xl
  active:scale-[0.97]
  disabled:opacity-60 disabled:cursor-not-allowed`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-30"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      <span>Analyzing...</span>
    </>
  ) : (
    <>
      <Activity className="w-4 h-4 transition-transform duration-300" />
      <span>Analyze Pipeline</span>
    </>
  )}
</button>
      </div>

      {/* Custom Result Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm glass-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Pipeline Analysis
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {error ? (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-2">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-red-400 font-semibold text-lg">Analysis Failed</h4>
                  <p className="text-slate-400 text-sm">{error}</p>
                </div>
              ) : modalData ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center gap-1 shadow-inner">
                      <Layers className="w-6 h-6 text-purple-400 mb-1" />
                      <span className="text-3xl font-black text-white">{modalData.num_nodes}</span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nodes</span>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center gap-1 shadow-inner">
                      <Share2 className="w-6 h-6 text-pink-400 mb-1" />
                      <span className="text-3xl font-black text-white">{modalData.num_edges}</span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Edges</span>
                    </div>
                  </div>

                  <div className={`mt-2 rounded-xl p-4 border flex items-center gap-4 ${modalData.is_dag ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <div className={`p-2 rounded-full ${modalData.is_dag ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {modalData.is_dag ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className={`font-bold ${modalData.is_dag ? 'text-emerald-400' : 'text-red-400'}`}>
                        {modalData.is_dag ? 'Valid DAG Structure' : 'Cycle Detected'}
                      </h4>
                      <p className="text-sm text-slate-400 mt-0.5">
                        {modalData.is_dag 
                          ? 'The pipeline flows in a valid directed acyclic graph.'
                          : 'The pipeline contains infinite loops (cycles) and is invalid.'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button 
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors border border-white/10 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};