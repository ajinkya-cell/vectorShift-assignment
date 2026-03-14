// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

// import { useState, useRef, useCallback } from 'react';
// import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
// import { useStore } from './store';
// import { shallow } from 'zustand/shallow';
// import { InputNode } from './nodes/inputNode';
// import { LLMNode } from './nodes/llmNode';
// import { OutputNode } from './nodes/outputNode';
// import { TextNode } from './nodes/textNode';

// import 'reactflow/dist/style.css';

// const gridSize = 20;
// const proOptions = { hideAttribution: true };
// const nodeTypes = {
//   customInput: InputNode,
//   llm: LLMNode,
//   customOutput: OutputNode,
//   text: TextNode,
// };

// const selector = (state) => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   getNodeID: state.getNodeID,
//   addNode: state.addNode,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   onConnect: state.onConnect,
// });

// export const PipelineUI = () => {
//     const reactFlowWrapper = useRef(null);
//     const [reactFlowInstance, setReactFlowInstance] = useState(null);
//     const {
//       nodes,
//       edges,
//       getNodeID,
//       addNode,
//       onNodesChange,
//       onEdgesChange,
//       onConnect
//     } = useStore(selector, shallow);

//     const getInitNodeData = (nodeID, type) => {
//       let nodeData = { id: nodeID, nodeType: `${type}` };
//       return nodeData;
//     }

//     const onDrop = useCallback(
//         (event) => {
//           event.preventDefault();
    
//           const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//           if (event?.dataTransfer?.getData('application/reactflow')) {
//             const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
//             const type = appData?.nodeType;
      
//             // check if the dropped element is valid
//             if (typeof type === 'undefined' || !type) {
//               return;
//             }
      
//             const position = reactFlowInstance.project({
//               x: event.clientX - reactFlowBounds.left,
//               y: event.clientY - reactFlowBounds.top,
//             });

//             const nodeID = getNodeID(type);
//             const newNode = {
//               id: nodeID,
//               type,
//               position,
//               data: getInitNodeData(nodeID, type),
//             };
      
//             addNode(newNode);
//           }
//         },
//         [reactFlowInstance]
//     );

//     const onDragOver = useCallback((event) => {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = 'move';
//     }, []);

//     return (
//         <>
//         <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
//             <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 onDrop={onDrop}
//                 onDragOver={onDragOver}
//                 onInit={setReactFlowInstance}
//                 nodeTypes={nodeTypes}
//                 proOptions={proOptions}
//                 snapGrid={[gridSize, gridSize]}
//                 connectionLineType='smoothstep'
//             >
//                 <Background color="#aaa" gap={gridSize} />
//                 <Controls />
//                 <MiniMap />
//             </ReactFlow>
//         </div>
//         </>
//     )
// }

// ui.js
// Pipeline Canvas UI

import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap
} from "reactflow";

import { useStore } from "./store";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode"; 
import { OutputNode } from "./nodes/outputNode"; 
import { TextNode } from "./nodes/textNode";
import { ConditionalNode } from "./nodes/conditionalNode";
import { FilterNode } from "./nodes/filterNode";
import { ChatNode } from "./nodes/chatNode";
import { DatabaseNode } from "./nodes/databaseNode";
import { APINode } from "./nodes/apiNode";

import "reactflow/dist/style.css";

const gridSize = 20;

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  conditional: ConditionalNode,
  filter: FilterNode,
  chat: ChatNode,
  database: DatabaseNode,
  api: APINode,
};

export const PipelineUI = () => {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);

  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type
  });

  const onDrop = useCallback((event) => {

    event.preventDefault();

    if (!reactFlowInstance) return;

    const reactFlowBounds =
      reactFlowWrapper.current.getBoundingClientRect();

    const transferData =
      event.dataTransfer.getData("application/reactflow");

    if (!transferData) return;

    const { nodeType } = JSON.parse(transferData);

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const nodeID = getNodeID(nodeType);

    const newNode = {
      id: nodeID,
      type: nodeType,
      position,
      data: getInitNodeData(nodeID, nodeType),
    };

    addNode(newNode);

  }, [reactFlowInstance, addNode, getNodeID]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="absolute inset-0 w-full h-full"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background gap={gridSize} color="rgba(255, 255, 255, 0.05)" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};