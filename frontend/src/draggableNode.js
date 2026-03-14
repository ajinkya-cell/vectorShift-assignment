// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
  return (
    <div
      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2 group transform hover:-translate-y-1"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-purple-400 transition-colors duration-300 shadow-[0_0_8px_rgba(0,0,0,0)] group-hover:shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>
      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">{label}</span>
    </div>
  );
  };
  