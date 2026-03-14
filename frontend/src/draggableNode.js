// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
  return (
    <div
      className="relative px-5 py-2.5 bg-[#0a0a0a]/50 hover:bg-[#111111]/80 backdrop-blur-md border border-white/5 hover:border-white/20 hover:border-t-purple-400/30 rounded-full cursor-grab active:cursor-grabbing active:scale-95 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_25px_rgba(168,85,247,0.25)] flex items-center gap-2.5 group overflow-hidden"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {/* Subtle glossy top inner rim */}
      <div className="absolute inset-0 rounded-full pointer-events-none border border-white/[0.03] group-hover:border-white/[0.08] transition-colors duration-300"></div>
      
      {/* Elegant moving glare effect */}
      <div className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-150%] translate-y-[-100%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none"></div>

      {icon && (
        <div className="relative z-10 text-slate-400 group-hover:text-purple-300 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300 transform group-hover:-translate-y-[1px]">
          {icon}
        </div>
      )}
      <span className="relative z-10 text-[13px] font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};