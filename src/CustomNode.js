import React, { memo} from 'react';
import { Handle, Position } from 'reactflow';
import {ArrowRightCircleIcon } from '@heroicons/react/20/solid'

const create = 100;
const dragHandleStyle = {
    display: 'inline-block',
    width: 25,
    height: 25,
    backgroundColor: 'teal',
    marginLeft: 5,
    borderRadius: '50%',
  };

function CustomNode({ data }) {

  return (
    <div className="border-2 border-grey-200 bg-white px-4 py-5 sm:px-6 rounded-md shadow-md">
        <div className="flex">
        
            <div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    placeholder="Event"
                />
            </div>
            
            
        </div>
        <Handle type="target" position={Position.Top} isConnectable={true} />
        <Handle id={create} type="target" position={Position.Left} />

        <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(CustomNode);


