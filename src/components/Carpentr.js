import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

export const useCarpentr = ({
  search = '',
  schema = {},
  filters = [],
  initialData = [],
  currentPage = 1,
  resultSet = 10,
  sortColumn = '',
  sortOrder = 'asc',
  pageNeighbors = 2,
  ls,
  path = '',
  saveSettings = false
}) => {
  let $searchKeys = []
  for (const key in schema) {
    if (schema[key].type === 'string' || schema[key].type === 'tags') {
      $searchKeys = [...$searchKeys, key]
    }
  }

  const [$search, $setSearch] = useState(search)
  const [$filterOptions, $setFilterOptions] = useState([])
  const [$filters, $setFilters] = useState(filters)
  const [$initialData, $setInitialData] = useState(initialData)
  const [$currentPage, $setCurrentPage] = useState(currentPage)
  const [$resultSet, $setResultSet] = useState(resultSet)
  const [$sortColumn, $setSortColumn] = useState(sortColumn)
  const [$sortOrder, $setSortOrder] = useState(sortOrder)
  const [$pageNeighbors, $setPageNeighbors] = useState(pageNeighbors)
  const [$totalPages, $setTotalPages] = useState(Math.ceil(initialData.length / resultSet))

  // When Updated Schema (incoming tag options from server), reprocess $filterOptions
  useDeepCompareEffect(() => {
    const filterKeys = Object.keys(schema)
    const filterOptions = filterKeys.map((d, i) => {
      return { type: schema[d].type, display: schema[d].display, key: d }
    })
    $setFilterOptions(filterOptions)
  }, [schema])

  // When Data returns from API, this function sets it as default.
  useDeepCompareEffect(() => {
    $setInitialData(initialData)
    if (initialData.length > 0) {
      $setTotalPages(Math.ceil(initialData.length / $resultSet))
    }
  }, [initialData])

  // SAVE PREF
  // saves search, sortOrder, sortColumn, currentPage, resultSet, filters
  const savePreference = (setting, value) => {
    if (!saveSettings) return

    let settings = {}

    if (ls(`table-${path}`)) { // if the setting exists, update it
      settings = ls(`table-${path}`)
      settings = {
        ...settings,
        [setting]: value
      }
    } else { // if setting doesn't exist, create it
      settings[setting] = value
    }
    ls(`table-${path}`, settings)
  }

  // FILTERS
  const scrubFilters = (filters) => {
    return filters.filter(f => f.filterValue !== '')
  }

  const setFilters = (filters) => {
    savePreference('filters', filters)
    $setFilters(filters)
  }

  const applyFilters = (array, validFilters) => {
    const filtered = array.filter(item => {
      return validFilters.every(filterObj => {
        // INVALID
        if (item[filterObj.filterKey] === null || item[filterObj.filterKey] === undefined) { return false }

        // STRING
        if (filterObj.type.type === 'string') {
          const value = item[filterObj.filterKey].toString().toLowerCase()
          const filterByValue = filterObj.filterValue.toString().toLowerCase()

          switch (filterObj.operatorValue) {
            case 'is':
              if (value.includes(filterByValue)) return true
              break
            case 'is not':
              if (!value.includes(filterByValue)) return true
              break
            default:
              return false
          }
        }

        // NUMBER
        if (filterObj.type.type === 'number') {
          const value = parseInt(item[filterObj.filterKey])
          const filterByValue = parseInt(filterObj.filterValue)

          switch (filterObj.operatorValue) {
            case 'is equal to':
              if (value === filterByValue) return true
              break
            case 'is less than':
              if (value < filterByValue) return true
              break
            case 'is greater than':
              if (value > filterByValue) return true
              break
            default:
              return false
          }
        }

        // BOOLEAN
        if (filterObj.type.type === 'boolean') {
          const value = item[filterObj.filterKey]
          const filterByValue = filterObj.filterValue === 'true' ? true : false

          switch (filterObj.operatorValue) {
            case 'is':
              if (value === filterByValue) return true
              break
            case 'is not':
              if (value !== filterByValue) return true
              break
            default:
              return false
          }
        }

        // DATE
        if (filterObj.type.type === 'date') {
          const value = new Date(item[filterObj.filterKey])
          const filterByValue = new Date(filterObj.filterValue)

          switch (filterObj.operatorValue) {
            case 'before':
              if (value < filterByValue) return true
              break
            case 'after':
              if (value > filterByValue) return true
              break
            case 'on':
              if (value.getTime() === filterByValue.getTime()) return true
              break
            default:
              return false
          }
        }

        // TAGS
        if (filterObj.type.type === 'tags') {
          const value = item[filterObj.filterKey].toString().toLowerCase()
          const filterByValue = filterObj.filterValue.toString().toLowerCase()

          switch (filterObj.operatorValue) {
            case 'is':
              if (value === filterByValue) return true
              break
            case 'is not':
              if (value !== filterByValue) return true
              break
            default:
              return false
          }
        }
      })
    })

    return filtered
  }

  // SEARCH
  const setSearchTerm = (e) => {
    savePreference('search', e.target.value)
    $setSearch(e.target.value)
  }

  const searchFilter = (arr, searchTerm, searchkeys) => {
    const filteredArray = arr.filter((obj) => {
      return searchkeys.some((key) => {
        if (obj[key] === null || obj[key] === undefined) { return false }
        return obj[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    })

    return filteredArray
  }

  // SORT
  const sortByColumn = (array) => {
    const order = $sortOrder.toLowerCase()

    return array.sort((a, b) => {
      let x = a[$sortColumn]
      let y = b[$sortColumn]

      if (typeof x === 'string') { x = ('' + x).toLowerCase() }
      if (typeof y === 'string') { y = ('' + y).toLowerCase() }

      if (order === 'desc') {
        return ((x < y) ? 1 : ((x > y) ? -1 : 0))
      } else {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      }
    })
  }

  const setColumnSortToggle = (e) => {
    const sortColumn = e.target.getAttribute('name')
    let sortOrder = $sortOrder
    if (sortColumn === $sortColumn) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      sortOrder = 'asc'
    }
    $setSortColumn(sortColumn)
    $setSortOrder(sortOrder)

    savePreference('sortColumn', sortColumn)
    savePreference('sortOrder', sortOrder)
  }

  // RESULT SET
  const setResultSet = (value) => {
    let resultSet = value

    if (typeof resultSet === 'string') {
      resultSet = parseInt(resultSet)
    }

    const totalPages = Math.ceil($initialData.length / resultSet)
    const currentPage = totalPages >= $currentPage ? $currentPage : 1
    $setResultSet(resultSet)
    $setTotalPages(totalPages)
    $setCurrentPage(currentPage)

    savePreference('resultSet', value)
  }

  // VISIBLE DATA
  const getVisibleData = () => {
    const offset = ($currentPage - 1) * parseInt($resultSet)
    const topOfRange = offset + parseInt($resultSet)
    let visible = $initialData

    // FILTERS
    if ($filters.length > 0) {
      const validFilters = scrubFilters($filters)
      if (validFilters.length > 0) { visible = applyFilters(visible, validFilters) }
    }

    // SEARCH
    if ($search) { visible = searchFilter(visible, $search, $searchKeys) }

    // RESET PAGE COUNT
    const totalPages = Math.ceil(visible.length / $resultSet)
    if (totalPages !== $totalPages) {
      $setTotalPages(totalPages)
      $setCurrentPage(1)
    }

    // SORT
    if ($sortColumn) {
      visible = sortByColumn(visible)
    }

    // reducing the result set down to one page worth of data
    return visible.filter((d, i) => {
      const visibleData = i >= offset && i < topOfRange
      return visibleData
    })
  }

  // PAGINATION
  const range = (start, end, step = 1) => {
    let i = start
    const range = []

    while (i <= end) {
      range.push(i)
      i += step
    }

    return range
  }

  const getPagination = () => {
    const totalNumbers = ($pageNeighbors * 2) + 1
    let pages = []

    if ($totalPages > totalNumbers) {
      let startPage, endPage

      if ($currentPage <= ($pageNeighbors + 1)) {
        startPage = 1
        endPage = ($pageNeighbors * 2) + 1
      } else if ($currentPage > ($totalPages - $pageNeighbors)) {
        startPage = $totalPages - (($pageNeighbors * 2))
        endPage = $totalPages
      } else {
        startPage = $currentPage - $pageNeighbors
        endPage = $currentPage + $pageNeighbors
      }

      pages = range(startPage, endPage)
    } else {
      pages = range(1, $totalPages)
    }

    return pages
  }

  const setCurrentPage = (page) => {
    $setCurrentPage(page)
    savePreference('currentPage', page)
  }

  return {
    search: $search,
    schema,
    filters: $filters,
    scrubFilters,
    filterOptions: $filterOptions,
    currentPage: $currentPage,
    resultSet: $resultSet,
    sortColumn: $sortColumn,
    sortOrder: $sortOrder,
    totalPages: $totalPages,
    setColumnSortToggle,
    setCurrentPage,
    setResultSet,
    setSearchTerm,
    setFilters,
    nextDisabled: $totalPages === $currentPage,
    prevDisabled: $currentPage === 1,
    visibleData: getVisibleData(),
    paginationButtons: getPagination()
  }
}
