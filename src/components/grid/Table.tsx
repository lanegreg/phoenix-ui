//#region [Imports]
import React, { useEffect } from 'react'
import { number, func, array } from 'prop-types'
import { Paginator } from '../grid'
import { useTable, usePagination } from 'react-table'
//#endregion

const Table = ({ data, columns, getPageOfData, numOfPages }) => {
  //#region [Hooks]

  //#endregion

  //#region [tang] [Table Setup]
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      pageCount: numOfPages,
      initialState: { pageIndex: 0 },
      manualPagination: true
    },
    usePagination
  )

  useEffect(() => {
    getPageOfData({ pageIndex, pageSize })
  }, [getPageOfData, pageIndex, pageSize])
  //#endregion

  //#region [JSX]
  return (
    <>
      <table
        {...getTableProps()}
        style={{ width: '97%' }}
        className="border-collapse text-left mx-4"
      >
        <thead className="border-b">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th className="py-2 px-6 bg-gray-100">
                <input type="checkbox" className="cursor-pointer" />
              </th>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="py-2 px-2 bg-gray-100 font-medium text-sm text-gray-700"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                <td className="py-2 px-6 border-b">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="py-2 px-2 border-b text-gray-700 text-sm"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Paginator
        pageIndex={pageIndex}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </>
  )
  //#endregion
}

//#region [Prop Types]
Table.propTypes = {
  data: array.isRequired,
  columns: array.isRequired,
  getPageOfData: func.isRequired,
  numOfPages: number.isRequired
}
//#endregion

export { Table }
