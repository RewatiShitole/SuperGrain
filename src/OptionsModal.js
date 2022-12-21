import React from "react";

export default function OptionsModal({ setOptionsModal }) {
  return (
    <div className="flex flex-col">
      {/* DELETE MODAL */}

      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* content */}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none dark:bg-dark-grey focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
              <h3 className="px-24 text-2xl font-semibold text-light-grey dark:text-white">
                Delete Event
              </h3>
              <button
                data-testid="xDeleteEvent"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                type="button"
                onClick={() => setOptionsModal(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* body */}
            <div className="relative flex-auto p-6 dark:bg-dark-grey bg-nav-pink">
              <p className="my-4 text-lg leading-relaxed dark:text-white text-light-grey">
                Are you sure you want to delete this event?
              </p>
            </div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
              <button
                data-testid="cancelDeleteEvent"
                className="px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 text-light-grey active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                type="button"
                onClick={() => setOptionsModal(false)}
              >
                Cancel
              </button>
              {/* <button
                data-testid="confirmDeleteEvent"
                className="px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-salmon text-light-grey active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                type="button"
                onClick={() => {
                  handleEventDelete();

                  setDeleteModal(false);
                }}
              >
                Yes, I am sure
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
    </div>
  );
}
