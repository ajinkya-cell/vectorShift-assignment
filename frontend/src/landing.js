import React from 'react';
import { Network, ArrowRight } from 'lucide-react';
import './index.css';

export const LandingPage = ({ onLaunch }) => {
  return (
    <div className="relative w-screen h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 translate-x-1/4 -translate-y-3/4 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <div className="mb-6 p-4 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-xl">
          <Network className="w-12 h-12 text-purple-400" />
        </div>

        <h1 
          className="text-7xl md:text-9xl tracking-tight font-instrument text-white mb-6"
          style={{ WebkitTextStroke: "1px currentColor" }}
        >
          Node{" "}
          <span className="italic aurora-text pr-4">
            Flow
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl font-light leading-relaxed">
          The next-generation visual builder for complex data architectures. 
          Connect nodes, shape logic, and execute powerful pipelines in a beautifully intuitive environment.
        </p>

        <button
          onClick={onLaunch}
          className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-semibold text-lg tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95 overflow-hidden"
        >
          {/* Subtle button glare */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          
          <span className="relative z-10">Launch Workspace</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Footer / decorative marks */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-12 text-xs text-slate-500 font-medium tracking-widest uppercase">
        <span>VectorShift Platform</span>
        <span>v1.0.0-Beta</span>
      </div>
    </div>
  );
};
