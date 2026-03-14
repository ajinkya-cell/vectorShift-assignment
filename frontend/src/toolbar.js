// toolbar.js
import "./index.css"
import { DraggableNode } from './draggableNode';
import { Download, Upload, FileText, Cpu, GitBranch, Filter, MessageSquare, Database, Globe } from 'lucide-react';

export const PipelineToolbar = ({ onReturnHome }) => {
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">
            {/* Mirror Glass Effect Container */}
            <div className="relative rounded-2xl md:rounded-full bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl p-4 md:px-8 flex flex-col md:flex-row items-center gap-6 justify-between overflow-hidden">
                {/* Subtle top glare/reflection */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/* Subtle aurora glow behind toolbar */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none opacity-50"></div>
                
     <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
        onClick={onReturnHome}
     >
  <h1 
  style={{ WebkitTextStroke: "0.7px currentColor" }}
  className="text-3xl tracking-tight font-instrument text-white">
    Node{" "}
    <span className="italic aurora-text pr-4">
      Flow
    </span>
  </h1>
</div>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-wrap gap-3 justify-center">
                    <DraggableNode type='customInput' label='Input' icon={<Download className="w-4 h-4" />} />
                    <DraggableNode type='llm' label='LLM' icon={<Cpu className="w-4 h-4" />} />
                    <DraggableNode type='customOutput' label='Output' icon={<Upload className="w-4 h-4" />} />
                    <DraggableNode type='text' label='Text' icon={<FileText className="w-4 h-4" />} />
                    <DraggableNode type='conditional' label='Conditional' icon={<GitBranch className="w-4 h-4" />} />
                    <DraggableNode type='filter' label='Filter' icon={<Filter className="w-4 h-4" />} />
                    <DraggableNode type='chat' label='Chat' icon={<MessageSquare className="w-4 h-4" />} />
                    <DraggableNode type='database' label='Database' icon={<Database className="w-4 h-4" />} />
                    <DraggableNode type='api' label='API' icon={<Globe className="w-4 h-4" />} />
                </div>
            </div>
            </div>
        </div>
    );
};
