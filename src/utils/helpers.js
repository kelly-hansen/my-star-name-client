export const uriBuilder = (uri, key, value) => {
  let prefix = uri[uri.length - 1] === '/' ? '?' : '&'
  return `${uri}${prefix}${key}=${value}`
}

export const convertTags = (tags) => {
  if (tags) {
    return tags.map((tag, i) => {
      return {
        label: tag.Key,
        value: tag.Value
      }
    })
  } else {
    return []
  }
}

// https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
export const isEqual = (value, other) => {
  // Get the value type
  var type = Object.prototype.toString.call(value)

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) { return false }

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) { return false }

  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length
  if (valueLen !== otherLen) { return false }

  // Compare two items
  var compare = function (item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1)

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) { return false }
    } else {
      // Otherwise, do a simple comparison
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) { return false }

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) { return false }
      } else {
        if (item1 !== item2) { return false }
      }
    }
  }

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) { return false }
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) { return false }
      }
    }
  }

  return true
}

// Make text ellipsis
export const makeEllipsis = (text, limit = 240) => {
  if (text.length > limit) {
    let trimmedText = text.slice()
    trimmedText = trimmedText.substring(0, limit)
    const i = trimmedText.lastIndexOf(' ')
    text = text.substring(0, i) + '...'
  }
  return text
}

// takes a youtube link and extracts the video ID
export const extractYoutubeID = (url = '') => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : ''
}

// string manipulation
export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const formatSnakeCase = (word) => {
  let formattedText = ''
  word = word.split('_')

  word.forEach((v) => {
    formattedText = formattedText + capitalize(v) + ' '
  })
  return formattedText.trim()
}

export const formatKebabCase = (word) => {
  let formattedText = ''
  word = word.split('-')

  word.forEach((v) => {
    formattedText = formattedText + capitalize(v) + ' '
  })
  return formattedText.trim()
}

export const formatCamelCase = (word) => {
  const formattedText = word.replace(/([A-Z])/g, " $1")
  return capitalize(formattedText)
}

// Date formatting
export const formatUTCDateForHTML = (date, display = false, showYear = true) => {
  const d = new Date(date)
  let month = '' + (d.getUTCMonth() + 1)
  let day = '' + d.getUTCDate()
  const year = d.getUTCFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  if (!showYear) { return [month, day].join('-') }

  return display
    ? [month, day, year].join('-')
    : [year, month, day].join('-')
}

export const normalizePhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/\D/g, '')
}

export const formatPhoneNumber = (rawPhoneNumber) => {
  const phoneNumber = normalizePhoneNumber(rawPhoneNumber)

  const partA = phoneNumber.substring(0, 3)
  const partB = phoneNumber.substring(3, 6)
  const partC = phoneNumber.substring(6, 10)

  // 2345678  =>  234-567-8
  if (partC) {
    return `(${partA}) ${partB}-${partC}`
  }
  // 2345 => 234-5
  if (partB) {
    return `${partA}-${partB}`
  }
  // if partA
  return phoneNumber
}

export const formatSocialSecurityNumber = (val) => {
  val = val.replace(/\D/g, '')
  val = val.replace(/^(\d{3})/, '$1-')
  val = val.replace(/-(\d{2})/, '-$1-')
  val = val.replace(/(\d)-(\d{4}).*/, '$1-$2')
  return val
}
