import {ArrowRightCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';
import {readWorkFlowData, readTableEntries} from "./database"




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function List() {



    let navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [workflowArray, setWorkflowArray] = useState([{}]);
    const [refreshList, setRefreshList] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [workflowId, setWorkflowId] = useState();
    
    const list = workflowArray? Object.keys(workflowArray).map(function(workflow) {
       
        return (<li key={workflowArray[workflow].entryName} className="col-span-1 flex rounded-md shadow-sm">
          <div
            className={classNames(
                workflowArray[workflow].workflowColor,
              'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
            )}
          >
            
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm pb-4">
              <a className="font-medium text-gray-900">
              {workflowArray[workflow].entryName}
              </a>
              
            </div>
            <div className="flex-shrink-0 pr-2">
            <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => {
                    setDeleteModal(true) 
                    setWorkflowId(workflowArray[workflow].workflowId)}}
              >
                <span className="sr-only">Open options</span>
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
           
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate("/Playground" , { state:  workflowArray[workflow].workflowId })}
              >
                <span className="sr-only">Open options</span>
                <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>)
       
            }): "";

      useEffect(() => {
          
        const getWorkFLows =  async() => {
            const wf = await readTableEntries()
            console.log("WORKFLOWS", wf)
            setWorkflowArray(wf)
        }

        getWorkFLows();
      }, [refreshList]);
    
    
  return (
    <div>
    <div className="grid grid-cols-5">
        <h2 className="text-sm font-medium text-gray-500">Saved Workflows</h2>
        
        <div className="col-span-3"/>

        <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() =>  setModal(true)}
            >
            Add Workflow
        </button>
        {modal ? (
            <CreateModal open={modal} setOpen={setModal} refreshList={refreshList} setRefreshList={setRefreshList}
            />
          ) : null}
        {deleteModal ? (
        <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} refreshList={refreshList} setRefreshList={setRefreshList} workflowId = {workflowId}
        />
        ) : null}
    </div>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
        {list}
      </ul>
    </div>
  )
}
