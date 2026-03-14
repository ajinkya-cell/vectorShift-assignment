// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }
import { useState, useMemo, useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);

  // Extract variables from {{variable}} - validate JavaScript variable names
  const variables = useMemo(() => {
    const matches = [...text.matchAll(/{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g)];
    return [...new Set(matches.map((m) => m[1].trim()))].filter(v => v.length > 0);
  }, [text]);

  const inputHandles = variables.map((v, index) => ({
    id: `${id}-${v}`,
    label: v
  }));

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(60, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  const lines = text.split('\n');
  const maxLineLength = Math.max(...lines.map(l => l.length));
  const dynamicWidth = Math.max(350, Math.min(500, maxLineLength * 8 + 60));

  return (
    <BaseNode
      title="Text"
      icon={<FileText className="w-4 h-4" />}
      inputs={inputHandles}
      outputs={[{ id: `${id}-output`, label: "output" }]}
      style={{ width: `${dynamicWidth}px` }}
      titleColor="text-pink-400"
    >
      <div className="flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/5 rounded-xl p-3 text-sm text-slate-200 resize-none focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 shadow-inner transition-all duration-300 backdrop-blur-sm"
          placeholder="Type here... Use {{var}} for variables"
          style={{ overflow: 'hidden' }}
        />

        {variables.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {variables.map(v => (
              <span 
                key={v}
                className="bg-pink-500/20 border border-pink-500/30 text-pink-300 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide shadow-[0_0_10px_rgba(236,72,153,0.1)]"
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};