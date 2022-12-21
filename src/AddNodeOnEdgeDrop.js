import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  
  Controls,
  Background,
} from 'reactflow';
import { useLocation } from "react-router-dom";
import 'reactflow/dist/style.css';


import './index.css';

import CustomNode from './CustomNode';
import { writeWorkFlowData, readWorkFlowData } from "./database";

const flowKey = 'example-flow';

const nodeTypes = {
  custom: CustomNode,
};


let id = Math.floor(Math.random() * 9999);
const create = 100;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const options = { hideAttribution: true };


function AddNodeOnEdgeDrop(){
  
    const location = useLocation();
    const workflowId = location.state;
  
  

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodeName, setNodeName] = useState('Node 1');

  const [selectedNode, setSelectedNode] = useState(null);


  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const { project, getNode } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const getNodeId = () => `randomnode_${+new Date()}`;

  useEffect(() => {
    console.log("Refresh")
    onRestore();
  }, []);

  useEffect(() => {
    setNodes((nds) =>
    
      nds && nds.map((node) => {
        if (node.selected) {
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }
       
        return node;
      })
    );

  }, [nodeName, setNodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.data.label)
  }, []);

  const onPaneClick = useCallback((event) => {
    setSelectedNode(null)
  }, []);

  const onConnectStart = useCallback((event, node) => {
    if (node.handleId === create) {
      const id = getId();
      const newNode = {
        id,
        type: 'custom',
        position: project({ x: getNode(node.nodeId).position.x, y: getNode(node.nodeId).position.y + 200 }),
        data: { label: `New Node` },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat({ id, source: node.nodeId, target: id}));
    }
  }, []);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      writeWorkFlowData(workflowId, flow)
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await readWorkFlowData(workflowId);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.flow.viewport;
        setNodes(flow.flow.nodes || []);
        setEdges(flow.flow.edges || []);
        setViewport({ x, y, zoom });
      }

    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      type: 'custom',
      data: { label: 'Added node' },
      position: {
        x: window.innerWidth - 100,
        y: window.innerHeight,
      },
    };
    setNodes((nds) => nds && nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        proOptions={options}
      >
        <div className="absolute right-0 mt-2 mx-2 z-10 grid grid-cols-3">
          <div className="col-span-1 col-start-1">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onSave}
            >
              Save
            </button>
          </div>
          <div className="col-span-1 col-start-2">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onRestore}
            >
              Restore
            </button>
          </div>
          <div className="col-span-1 col-start-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onAdd}
            >
              Add Node
            </button>
          </div>
          {selectedNode != null ?  
            <div className="col-span-3 mt-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-500">
                Edit Node
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={selectedNode}
                  onChange={(evt) => {
                    setNodeName(evt.target.value) 
                    setSelectedNode(evt.target.value)
                    console.log(evt.target.value)
                  }}
                />
              </div>
            </div> : <div></div>
          }
          
        </div>
      
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
