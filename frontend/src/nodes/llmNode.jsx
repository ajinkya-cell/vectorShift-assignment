// llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }

import { Cpu } from "lucide-react";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id }) => {

  return (
    <BaseNode
      title="Language Model"
      icon={<Cpu className="w-4 h-4" />}
      inputs={[
        { id: `${id}-system`, label: "system", style: { top: "33%" } },
        { id: `${id}-prompt`, label: "prompt", style: { top: "66%" } }
      ]}
      outputs={[
        { id: `${id}-response`, label: "response" }
      ]}
      titleColor="text-cyan-400"
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-white/5 shadow-inner">
          Connect a system prompt and user prompt to generate a response.
        </div>
      </div>
    </BaseNode>
  );
};