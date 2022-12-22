import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  useViewport,
  Controls,
  Background,
} from 'reactflow';
import { useLocation } from "react-router-dom";
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './index.css';

import CustomNode from './CustomNode';
import { writeWorkFlowData, readWorkFlowData } from "./database";



const nodeTypes = {
  custom: CustomNode,
};



const create = 100;


const fitViewOptions = {
  padding: 3,
};

const options = { hideAttribution: true };


function AddNodeOnEdgeDrop(){

  const { x, y } = useViewport();
  
  const location = useLocation();
  const workflowId = location.state;
  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedNode, setSelectedNode] = useState(null);


  const [rfInstance, setRfInstance] = useState(null);
  const { getViewport, setViewport } = useReactFlow();

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
            label: selectedNode,
          };
        }
       
        return node;
      })
    );

  }, [selectedNode, setNodes]);



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `Added Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.data.label)
  }, []);


  const onNodesDelete = useCallback((node) => {
    setSelectedNode(null)
  }, []);

  const onPaneClick = useCallback((event) => {
    setSelectedNode(null)
  }, []);

  const onConnectStart = useCallback((event, node) => {
    if (node.handleId === create) {
      const id = getNodeId();
      const newNode = {
        id,
        type: 'custom',
        position: { x: getNode(node.nodeId).position.x, y: getNode(node.nodeId).position.y + 200 },
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

  

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onNodesDelete={onNodesDelete}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
        style={{background: "#f4f4f5"}}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        proOptions={options}
      >
        <div className="absolute right-0 mt-2 mx-2 z-10 grid grid-cols-2">
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
    
          

          <Sidebar />
          {selectedNode != null ?  
            <div className="col-span-2 mt-2">
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
