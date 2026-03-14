import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || "equals");

  return (
    <BaseNode
      title="Filter"
      inputs={[
        { id: `${id}-data`, label: "Data" }
      ]}
      outputs={[
        { id: `${id}-pass`, label: "Pass", style: { top: "33%" } },
        { id: `${id}-fail`, label: "Fail", style: { top: "66%" } }
      ]}
      titleColor="text-blue-300"
    >
      <div>
        <label className="text-xs">Filter Type</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="greater">Greater Than</option>
        </select>
      </div>
    </BaseNode>
  );
};
