import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || "GET");

  return (
    <BaseNode
      title="API Request"
      inputs={[
        { id: `${id}-url`, label: "URL" },
        { id: `${id}-body`, label: "Body", style: { top: "50%" } }
      ]}
      outputs={[
        { id: `${id}-response`, label: "Response" }
      ]}
      titleColor="text-red-300"
    >
      <div>
        <label className="text-xs">Method</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
