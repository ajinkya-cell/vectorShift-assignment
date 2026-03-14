// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="glass border-b border-white/10 p-5 px-8 flex flex-col md:flex-row shadow-xl items-center gap-6 justify-between z-10">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/30">V</div>
                <h1 className="text-xl font-bold tracking-tight text-gradient">VectorShift Builder</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest hidden md:block">Node Types</div>
                <div className="flex flex-wrap gap-3 justify-center">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='conditional' label='Conditional' />
                    <DraggableNode type='filter' label='Filter' />
                    <DraggableNode type='chat' label='Chat' />
                    <DraggableNode type='database' label='Database' />
                    <DraggableNode type='api' label='API' />
                </div>
            </div>
        </div>
    );
};
