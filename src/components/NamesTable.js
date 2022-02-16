import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCarpentr } from '../components/Carpentr'
import { TableSearch, SortArrow, Pagination, ResultSet, Loading } from '../cdui'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllGeneratedNames } from '../redux/actions/names'
import moment from 'moment'

const NamesTable = () => {
  const loading = useSelector(state => state.names.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetAllGeneratedNames())
  }, [])

  const namesData = useSelector(state => state.names.allGeneratedNames)

  const payload = useCarpentr({
    initialData: namesData || [],
    schema: {
      id: { type: 'string' },
      name: { type: 'string' },
      created_at: { type: 'date' }
    },
    sortColumn: 'id',
    sortOrder: 'desc'
  })

  const renderNamesTable = () => {
    return (
      <Fragment>
        <div className='row mb-4'>
          <TableSearch
            search={payload.search}
            setSearchTerm={payload.setSearchTerm} />
        </div>
        <table className='col-12 px-0 application-table table-responsive-md mb-3'>
          <thead className='border-bottom'>
            <tr>
              <th className='pointer px-3' name='id' onClick={payload.setColumnSortToggle}>
                  ID <SortArrow name='id' sortColumn={payload.sortColumn} sortOrder={payload.sortOrder} />
              </th>
              <th className='pointer px-3' name='name' onClick={payload.setColumnSortToggle}>
                NAME <SortArrow name='name' sortColumn={payload.sortColumn} sortOrder={payload.sortOrder} />
              </th>
              <th className='pointer px-3' name='created_at' onClick={payload.setColumnSortToggle}>
                DATE CREATED <SortArrow name='created_at' sortColumn={payload.sortColumn} sortOrder={payload.sortOrder} />
              </th>
            </tr>
          </thead>
          <tbody>
            {payload.visibleData.length === 0 ? (
              <tr>
                <td colSpan='5' className='pl-3'>No names found.</td>
              </tr>
            ) : (
              payload.visibleData.map((d, i) => {
                return (
                  <tr key={i}>
                    <td className='px-3'>{d.id}</td>
                    <td className='px-3'>{d.name}</td>
                    <td className='px-3'>{moment(d.created_at).format('MMM DD, LT')}</td>
                  </tr>
                )
              })
            )
            }
          </tbody>
        </table>
        <div className='row justify content-between'>
          <div className='col-md-6 mb-4'>
            <Pagination
              totalPages={payload.totalPages}
              prevDisabled={payload.prevDisabled}
              nextDisabled={payload.nextDisabled}
              setPageNumber={payload.setCurrentPage}
              pageNumber={payload.currentPage}
              paginationButtons={payload.paginationButtons} />
          </div>

          <div className='col-md-6 mb-4'>
            <ResultSet
              defaultRows={10}
              gap={[10, 20, 30]}
              totalPages={payload.totalPages}
              setResultSet={payload.setResultSet} />
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    loading ? (
      <Fragment>
        <div className="py-5"></div>
        <Loading />
      </Fragment>
    ) : (
      <div className='row align-items-center justify-content-center m-0'>
        <div className='col-12 col-lg-10 py-5'>
          <h3 className='text-center py-5'>Generated Names</h3>
          {namesData ? renderNamesTable() : (
            <div className='row justify-content-center'>
              <div className='col-12 col-md-5'>
                <p className='text-center'>Names could not be retrieved.</p>
                <button className='btn btn-primary w-100' onClick={() => dispatch(startGetAllGeneratedNames())}>Try Again</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}

NamesTable.propTypes = {
}

export default NamesTable
