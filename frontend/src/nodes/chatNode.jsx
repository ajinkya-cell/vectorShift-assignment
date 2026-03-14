import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { BaseNode } from "./BaseNode";

export const ChatNode = ({ id, data }) => {
  const [role, setRole] = useState(data?.role || "user");

  return (
    <BaseNode
      title="Chat"
      icon={<MessageSquare className="w-4 h-4" />}
      inputs={[
        { id: `${id}-input`, label: "Message" }
      ]}
      outputs={[
        { id: `${id}-output`, label: "Response" }
      ]}
      titleColor="text-purple-300"
    >
      <div>
        <label className="text-xs">Role</label>
        <select
          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="assistant">Assistant</option>
          <option value="system">System</option>
        </select>
      </div>
    </BaseNode>
  );
};
