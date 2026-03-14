import { Handle, Position, useNodeId } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({
  title,
  icon = null,
  inputs = [],
  outputs = [],
  children,
  style = {},
  className = "",
  titleColor = "text-purple-400",
  showHandleLabels = true,
  headerContent = null
}) => {
  const nodeId = useNodeId();
  const removeNode = useStore(state => state.removeNode);

  return (
    <div
      className={`glass-card rounded-2xl p-5 min-w-[350px] shadow-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] group hover:border-purple-500/30 relative ${className}`}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

      {/* Header with title and optional custom content */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          
          {icon && (
            <span className={`flex items-center ${titleColor} opacity-90`}>
              {icon}
            </span>
          )}
          <div className={`text-base font-bold tracking-wide ${titleColor}`}>
            {title}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {headerContent}
          <button
            onClick={() => removeNode(nodeId)}
            className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="Delete Node"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Input Handles — circle outside, label inside the node edge */}
      {inputs.map((handle, idx) => {
        const topPct = `${((idx + 1) * 100) / (inputs.length + 1)}%`;
        return (
          <div key={`input-${handle.id}`}>
            {/* The circle sits outside the left border */}
            <Handle
              type="target"
              position={Position.Left}
              id={handle.id}
              style={{ top: `calc(${topPct})`, left: '-14px' }}
              className="!w-6 !h-6 !rounded-full !bg-slate-800 !border-2 !border-purple-400 hover:!bg-purple-400  !transition-all !duration-200 !shadow-[0_0_10px_rgba(168,85,247,0.4)] !cursor-crosshair"
            />
            {/* The label sits inside the node, flush with the left edge */}
            {showHandleLabels && handle.label && (
              <span
                className="absolute text-[10px] font-semibold text-purple-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-purple-500/20 shadow-sm pointer-events-none"
                style={{ top: `calc(${topPct} - 10px)`, left: '8px', zIndex: 5 }}
              >
                {handle.label}
              </span>
            )}
          </div>
        );
      })}

      {/* Main content area — padded on both sides so labels don't collide */}
      <div className="space-y-4 my-2 relative z-0 px-2">
        {children}
      </div>

      {/* Output Handles — circle outside, label inside the node edge */}
      {outputs.map((handle, idx) => {
        const topPct = `${((idx + 1) * 100) / (outputs.length + 1)}%`;
        return (
          <div key={`output-${handle.id}`}>
            {/* The circle sits outside the right border */}
            <Handle
              type="source"
              position={Position.Right}
              id={handle.id}
              style={{ top: `calc(${topPct})`, right: '-14px' }}
              className="!w-6 !h-6 !rounded-full !bg-slate-800 !border-2 !border-pink-400 hover:!bg-pink-400 hover: !transition-all !duration-200 !shadow-[0_0_10px_rgba(236,72,153,0.4)] !cursor-crosshair"
            />
            {/* The label sits inside the node, flush with the right edge */}
            {showHandleLabels && handle.label && (
              <span
                className="absolute text-[10px] font-semibold text-pink-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-pink-500/20 shadow-sm pointer-events-none"
                style={{ top: `calc(${topPct} - 10px)`, right: '8px', zIndex: 5 }}
              >
                {handle.label}
              </span>
            )}
          </div>
        );
      })}

    </div>
  );
};