import {ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import ExampleModal from './ExampleModal';

const projects = [
  { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
  { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
  { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
  { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },

]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function List() {

    let navigate = useNavigate();
    const [modal, setModal] = useState(false);
  return (
    <div>
    <div className="grid grid-cols-5">
        <h2 className="text-sm font-medium text-gray-500">Saved Workflows</h2>
        
        <div className="col-span-3"/>

        <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            onClick={() =>  setModal(true)}
            >
            Add Workflow
        </button>
        {modal ? (
            <ExampleModal open={modal} setOpen={setModal}
            />
          ) : null}
    </div>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
        {projects.map((project) => (
          <li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                project.bgColor,
                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
              )}
            >
              
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm pb-4">
                <a className="font-medium text-gray-900">
                  {project.name}
                </a>
                
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  onClick={() => navigate("/Playground")}
                >
                  <span className="sr-only">Open options</span>
                  <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
