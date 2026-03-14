import { useState } from "react";
import { Database } from "lucide-react";
import { BaseNode } from "./BaseNode";

export const DatabaseNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "select");

  return (
    <BaseNode
      title="Database"
      icon={<Database className="w-4 h-4" />}
      inputs={[
        { id: `${id}-query`, label: "Query" }
      ]}
      outputs={[
        { id: `${id}-result`, label: "Result" }
      ]}
      titleColor="text-yellow-300"
    >
      <div>
        <label className="text-xs">Operation</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="select">SELECT</option>
          <option value="insert">INSERT</option>
          <option value="update">UPDATE</option>
        </select>
      </div>
    </BaseNode>
  );
};
