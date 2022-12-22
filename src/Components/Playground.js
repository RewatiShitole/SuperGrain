
import { Disclosure} from '@headlessui/react'
import { useNavigate} from "react-router-dom";
import WorkFlow from './WorkFlow';

export default function Playground() {
    
    let navigate = useNavigate();

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="hidden sm:-my-px  sm:flex  pt-4 pb-2">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={()=>navigate("/")}>
                                        Dashboard
                                    </button>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center"/>
                        </div>
                    </div>  
                </Disclosure>
                <div className="py-10">
                    <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-500">Workflow</h1>
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="h-screen px-4 py-8 sm:px-0">
                            <div className="h-5/6 rounded-lg border-4  border-gray-300">
                            
                                < WorkFlow />
                            </div>
                        </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
