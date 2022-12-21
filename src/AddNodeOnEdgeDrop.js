import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';

import CustomNode from './CustomNode';

const flowKey = 'example-flow';

const nodeTypes = {
  custom: CustomNode,
};




let id = 1;
const create = 100;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const options = { hideAttribution: true };

function AddNodeOnEdgeDrop({initialNodes}){
  // console.log(initialNodes)

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const { project, getNode } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    onRestore();
  }, []);

  

  // const connectingNodeId = useRef(null);

  const onConnectStart = useCallback((event, node) => {
    console.log(node.handleId)
    if (node.handleId == create) {
      const id = getId();
      const newNode = {
        id,
        type: 'custom',
        position: project({ x: getNode(node.nodeId).position.x, y: getNode(node.nodeId).position.y + 200 }),
        data: { label: `Node ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat({ id, source: node.nodeId, target: id}));
    }
  }, []);

  // const onConnectStart = useCallback((_, { nodeId }) => {
  //   connectingNodeId.current = nodeId;
  // }, []);

  // const onConnectEnd = useCallback(
  //   (event) => {
  //     const targetIsPane = event.target.classList.contains('react-flow__pane');

  //     const targetIsHandle = event.target.classList.contains('react-flow__handle');

  //     if (targetIsPane) {
  //       // we need to remove the wrapper bounds, in order to get the correct position
  //       const id = getId();
  //       const newNode = {
  //         id,
  //         type: 'custom',
  //         position: project({ x: getNode(connectingNodeId.current).position.x, y: getNode(connectingNodeId.current).position.y + 200 }),
  //         data: { label: `Node ${id}` },
  //       };

  //       setNodes((nds) => nds.concat(newNode));
  //       setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id}));
  //     }
  //   },
  //   [project]
  // );
  

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        // onConnectEnd={onConnectEnd}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        proOptions={options}
      >
        <div className="save__controls">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={onSave}
        >
          Save
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={onRestore}
        >
          Restore
        </button>
      </div>
      <MiniMap />
      <Controls/>
      <Background variant="dots"/>
      </ReactFlow>
    </div>
  );
};

export default function AddNodeOnEdgeDropProvider({initialNodes}) { 
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop initialNodes={initialNodes} />
    </ReactFlowProvider>
);
};
