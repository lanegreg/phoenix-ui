//#region [Imports]
import React, { useMemo, useState, useCallback } from 'react'
import { Table } from '../grids'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useCustomersData } from '../../api-services'
//#endregion

const CustomerGrid = () => {
  //#region [Hooks]
  const [numOfPages, setNumOfPages] = useState(1)
  const [pageOfData, setPageOfData] = useState([])
  const customersData = useCustomersData()

  const getPageOfData = useCallback(
    ({ pageSize, pageIndex }) => {
      const startRow = pageSize * pageIndex
      const endRow = startRow + pageSize

      setPageOfData(customersData.slice(startRow, endRow))
      setNumOfPages(Math.ceil(customersData.length / pageSize))
    },
    [customersData]
  )
  //#endregion

  //#region [Handlers]
  const curryHandleOrdersClick = id => {
    return event => {
      console.log(`Orders for CustomerID:[${id}] was clicked.`)
      event.preventDefault()
    }
  }
  //#endregion

  //#region [plum] [Columns Structure]
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Address',
        accessor: 'Address'
      },
      {
        Header: 'Employee ID',
        accessor: 'employid'
      },
      {
        Header: 'Orders',
        accessor: 'id',
        id: 'id',
        Cell: ({ row, cell }) => (
          <a
            id={row.id}
            href="#nonav"
            className="text-neon_blue hover:underline"
            onClick={curryHandleOrdersClick(cell.value)}
          >
            Orders
          </a>
        )
      }
    ],
    []
  )
  //#endregion

  //#region [JSX]
  return (
    <>
      <section id="grid-head" className="bg-white pt-6">
        <div className="container px-6 pb-2 text-3xl text-gray-700 font-semibold">
          Customers
        </div>
        <div className="flex justify-between items-center pt-2 px-6 bg-white">
          <div className="flex items-center">
            <span className="mr-10 mt-2 pb-3 border-b-2 border-neon_blue text-neon_blue">
              All Customers
            </span>
            <span className="pb-3 mt-2">
              <a href="#nonav" className="text-gray-600 hover:text-neon_blue">
                Inactive
              </a>
            </span>
          </div>
          <div className="flex items-center">
            <button
              disabled
              className="cursor-not-allowed bg-neon_blue hover:bg-light_slate_blue focus:outline-none text-sm text-white rounded-sm px-4 py-2 mb-4 mr-6 transition-colors duration-200 ease-in-out"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add new customer
            </button>
          </div>
        </div>
      </section>

      <section id="grid" className="mx-auto px-6">
        <div className="bg-white rounded-sm overflow-hidden my-4">
          <div className="relative inline-block m-4 text-gray-400">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              className="text-sm text-gray-600 border-solid border border-gray-300 hover:border-gray-400 focus:border-gray-400 w-56 rounded pl-10 pr-4 py-1 focus:outline-none"
              type="text"
              placeholder="Search employee"
            />
          </div>
          <div className="mr-5 mt-4 inline-block float-right text-gray-600 text-sm">
            <button className="mr-2 px-5 py-1 border border-gray-400 rounded-sm hover:bg-gray-300 focus:outline-none transition-colors duration-200 ease-in-out">
              <FontAwesomeIcon icon={faPrint} className="mr-2" />
              Print
            </button>
            <button className="px-5 py-1 border border-gray-400 rounded-sm hover:bg-gray-300 focus:outline-none transition-colors duration-200 ease-in-out">
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Delete
            </button>
          </div>

          <Table
            data={pageOfData}
            columns={columns}
            numOfPages={numOfPages}
            getPageOfData={getPageOfData}
          />
        </div>
      </section>
    </>
  )
  //#endregion
}

export { CustomerGrid }
