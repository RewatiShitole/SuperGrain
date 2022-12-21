import React, { memo} from 'react';
import { Handle, Position } from 'reactflow';


const create = 100;


function CustomNode({ id, data }) {

  return (
    <div className="border-1 border-grey-200 bg-white px-4 py-5 sm:px-6 rounded-md shadow-md">
        <div className="flex">
            <div>
                <span  placeholder="Event" className="block w-full px-8 py-4 rounded-md border-gray-300 shadow-sm sm:text-sm">{data.label}</span>
            </div>
        </div>
        <Handle type="target" position={Position.Top} isConnectable={true} />
        <Handle id={create} type="target" position={Position.Left} />
        <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(CustomNode);


