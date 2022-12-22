import React, { memo} from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ id, data }) {
  
  const create = 100;

  return (
    <div className="border-1 bg-white px-4 py-5 sm:px-6 rounded-md shadow-md">
        <div className="flex">
            <div>
                <span placeholder="Event" className="block w-full px-8 py-4 rounded-md">{data.label}</span>
            </div>
        </div>
        <Handle type="target" position={Position.Top} isConnectable={true} style={{
          width: 10,
          height: 10,
          backgroundColor: 'black',
          borderRadius: '50%',
        }}/>
        <Handle id={create} type="target" position={Position.Left} />
        <Handle type="source" position={Position.Bottom}  style={{
          width: 10,
          height: 10,
          backgroundColor: 'black',
          borderRadius: '50%',
        }}/>
    </div>
  );
}

export default memo(CustomNode);


