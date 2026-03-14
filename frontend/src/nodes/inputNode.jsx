import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [type, setType] = useState(
    data?.inputType || "Text"
  );

  return (
    <BaseNode
      title="Input"
      outputs={[{ id: `${id}-value`, label: "out" }]}
      titleColor="text-blue-400"
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Name</span>
          <input
            className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 shadow-inner"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Type</span>
          <select
            className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 shadow-inner appearance-none custom-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="bg-slate-800">Text</option>
            <option className="bg-slate-800">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};