import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const ConditionalNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || "if");

  return (
    <BaseNode
      title="Conditional"
      inputs={[
        { id: `${id}-condition`, label: "Condition" }
      ]}
      outputs={[
        { id: `${id}-true`, label: "True", style: { top: "33%" } },
        { id: `${id}-false`, label: "False", style: { top: "66%" } }
      ]}
      titleColor="text-green-300"
    >
      <div>
        <label className="text-xs">Logic</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>if</option>
          <option>switch</option>
        </select>
      </div>
    </BaseNode>
  );
};
