//#region [Imports]
import React from 'react'
import { number, bool, func } from 'prop-types'
//#endregion

const Paginator = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  gotoPage,
  nextPage,
  previousPage
}) => {
  //#region [JSX]
  return (
    <section id="paginator">
      <div className="rounded-md bg-white py-4 px-4 ml-6 overflow-x-auto">
        <div className="flex rounded mr-4 text-gray-500 text-lg">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="py-2 px-3 focus:outline-none font-semibold bg-white border border-gray-300 border-r-0 ml-0 rounded-l hover:bg-gray-300 hover:text-gray-600 transition-colors duration-200 ease-in-out"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="py-2 px-3 focus:outline-none font-semibold bg-white border border-gray-300 border-r-0 hover:bg-gray-300 hover:text-gray-600 transition-colors duration-200 ease-in-out"
          >
            {'<'}
          </button>
          <button
            disabled
            className="py-2 px-3 focus:outline-none text-white font-semibold border border-r-0 border-l-0 border-neon_blue bg-neon_blue cursor-default"
          >
            1
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="py-2 px-3 focus:outline-none font-semibold bg-white border border-gray-300 border-r-0 border-l-0 hover:bg-gray-300 hover:text-gray-600 transition-colors duration-200 ease-in-out"
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="py-2 px-3 focus:outline-none font-semibold bg-white border border-gray-300 rounded-r hover:bg-gray-300 hover:text-gray-600 transition-colors duration-200 ease-in-out"
          >
            {'>>'}
          </button>
        </div>
      </div>
    </section>
  )
  //#endregion
}

//#region [Prop Types]
Paginator.propTypes = {
  canPreviousPage: bool.isRequired,
  canNextPage: bool.isRequired,
  pageCount: number.isRequired,
  gotoPage: func.isRequired,
  nextPage: func.isRequired,
  previousPage: func.isRequired
}
//#endregion

export { Paginator }
