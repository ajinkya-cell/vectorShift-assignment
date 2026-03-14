// outputNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const OutputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
//   const [outputType, setOutputType] = useState(data.outputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setOutputType(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-value`}
//       />
//       <div>
//         <span>Output</span>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input 
//             type="text" 
//             value={currName} 
//             onChange={handleNameChange} 
//           />
//         </label>
//         <label>
//           Type:
//           <select value={outputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">Image</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [type, setType] = useState(
    data?.outputType || "Text"
  );

  return (
    <BaseNode
      title="Output"
      inputs={[{ id: `${id}-value`, label: "in" }]}
      titleColor="text-green-400"
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Name</span>
          <input
            className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all duration-300 shadow-inner"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Type</span>
          <select
            className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all duration-300 shadow-inner appearance-none custom-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="bg-slate-800">Text</option>
            <option className="bg-slate-800">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};