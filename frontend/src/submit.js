import { useStore } from "./store";

export const SubmitButton = () => {

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const submit = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/pipelines/parse",
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

      const dagString = data.is_dag ? "✓ Yes" : "✗ No";

      alert(
`Pipeline Analysis

━━━━━━━━━━━━━━━━━━━━
Nodes: ${data.num_nodes}
Edges: ${data.num_edges}
Is DAG: ${dagString}
━━━━━━━━━━━━━━━━━━━━`
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
      <button
        onClick={submit}
        className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Analyze Pipeline
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
      </button>
    </div>
  );
};