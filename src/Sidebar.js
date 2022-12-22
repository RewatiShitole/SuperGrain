import React from 'react';

export default function SideBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
       
      <div className="col-span-2 mt-2 inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onDragStart={(event) => onDragStart(event, 'custom')} draggable>
        Drag to Add Node
      </div>
   
  );
};
