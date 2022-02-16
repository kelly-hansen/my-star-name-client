import MonthPicker from 'react-month-picker'
import { isEqual } from '../utils/helpers'

const __MIN_VALID_YEAR = 1000
const _SINGLE_KEYS = ['year', 'month',]
const _RANGE_KEYS = ['from', 'to',]
const __YEAR = (new Date()).getFullYear()

function mapToArray(num, callback) {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(callback(i))
  }
  return arr
}

function getYearMon(year, min, max) {
  const ym = typeof year === 'object' && year.year ? { year: year.year, month: year.month } : (typeof year === 'number' ? { year } : { __YEAR })
  ym.min = min || 1
  ym.max = max || 12
  return ym
}

function getYearsByNum(n, minYear) {
  let maxYear = __YEAR
  // n is count of years
  if (n && n > 0 && n < 100) {
    minYear = minYear || (maxYear - n + 1)
  }
  //
  else {
    // n is max year
    if (n && n >= __MIN_VALID_YEAR)
      maxYear = n

    if (minYear) {
      n = maxYear - minYear + 1
    }
    else {
      n = 5
      minYear = maxYear - n + 1
    }
  }
  return mapToArray(n, i => {
    return getYearMon(minYear + i)
  })
}

function getYearArray(years) {
  if (Array.isArray(years)) {
    return years.map((y, i) => {
      return getYearMon(y)
    }).sort((a, b) => (a.year - b.year))
  }
  if ((typeof years === 'object')) {
    let n = 0, min = 0
    const ymin = getYearMon(years.min), ymax = getYearMon(years.max)
    if (ymin.year > __MIN_VALID_YEAR)
      min = ymin.year
    if (ymax.year >= min)
      n = ymax.year
    const arr = getYearsByNum(n, min)
    const last = arr.length - 1
    if (last >= 0) {
      arr[0].min = ymin.month || arr[0].min
      arr[last].max = ymax.month || arr[last].max
    }
    return arr
  }
  else if (typeof years === 'number' && years > 0)
    return getYearsByNum(years)
  else
    return getYearsByNum(5)
}

function validate(d, years, idx, yearIndexes) {
  let ym
  if (d && (typeof d.year === 'number') && d.year > __MIN_VALID_YEAR
    && (typeof d.month === 'number') && d.month >= 1 && d.month <= 12) {
    ym = d
  }

  let foundThisYear
  for (let i = 0; i < years.length; i++) {
    if (ym && years[i].year === ym.year) {
      yearIndexes[idx] = i
      return ym
    }
    else if (years[i].year === __YEAR) {
      foundThisYear = i
    }
  }

  if (typeof foundThisYear === 'number') {
    yearIndexes[idx] = foundThisYear
    return { year: __YEAR }
  }

  const last = yearIndexes[idx] = years.length - 1
  const y = years[last]
  return { year: y.year, month: Math.floor((y.max - y.min) / 2) }

}

function validValue(value, years, yearIndexes) {
  value = value || {}
  if (typeof value.year === 'number') {
    const { year, month, } = validate(value, years, 0, yearIndexes)
    return { type: 'single', pads: 1, year, month, }
  }
  else if (Array.isArray(value) && value.length > 0) {
    return {
      type: 'multiple', pads: 1,
      choices: value.map((v, i) => validate(v, years, 0, i === 0 ? yearIndexes : [0]))
    }
  }
  else if (value.from && value.to) {
    const from = validate(value.from, years, 0, yearIndexes),
      to = validate(value.to, years, 1, yearIndexes)
    if (from.year > to.year || (from.year === to.year && from.month > to.month)) {
      from.year = to.year
      from.month = to.month
      if (from.month < 1) {
        from.year--
        from.month += 12
      }
    }
    return { type: 'range', pads: 2, from, to, }
  }
  return { pads: 0 }
}

function validateAutoRange(n) {
  if (n <= 0) return 0
  return Math.floor(n)
}

export default class Picker extends MonthPicker {
  constructor(props) {
    super(props)
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.value, state.rawValue.choices)) {
      const yearArr = getYearArray(props.years)
      const yearIndexes = [0]
      const rawValue = validValue(props.value, yearArr, yearIndexes)
      return {
        age: props.age,
        autoRange: validateAutoRange(props.autoRange),
        years: yearArr,
        rawValue,
        yearIndexes,
      }
    }

    return null
  }
}

export const handleMonthChange = (year, month, originalValues, setFieldValue) => {
  const months = [...originalValues]
  const selected = { year, month }

  const index = months.findIndex(d => d.year === year && d.month === month)
  index === -1
    ? months.push(selected)
    : months.splice(index, 1)

  setFieldValue('monthsMissed', [...months])
}

export const handleMonthDismiss = (months, setFieldValue) => {
  setFieldValue('monthsMissed', months)
}