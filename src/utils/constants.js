export const states = [
  'Alaska',
  'Alabama',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]

export const selectInputStyles = {
  control: (styles, options) => {
    return {
      ...styles,
      backgroundColor: 'white',
      border: '1px solid #e2e2e2',
      borderRadius: '2px',
      ':hover': {
        border: '1px solid #e2e2e2'
      }
    }
  },
  input: (styles, options) => { return { ...styles, padding: '0.4rem 0.4rem' } },
  clearIndicator: (styles, options) => { return { ...styles, cursor: 'pointer' } },
  placeholder: (styles, options) => { return { ...styles, padding: '0.4rem 0.4rem', opacity: '0.5' } }
}

export const selectOptionStyles = {
  control: (styles, options) => {
    return {
      ...styles,
      backgroundColor: 'white',
      border: '1px solid #e2e2e2',
      borderRadius: '2px',
      ':hover': {
        border: '1px solid #e2e2e2'
      }
    }
  },
  input: (styles, options) => { return { ...styles, padding: '0.4rem 0.4rem' } },
  multiValueRemove: (styles, options) => { return { ...styles, cursor: 'pointer' } },
  placeholder: (styles, options) => { return { ...styles, padding: '0.4rem 0.4rem', opacity: '0.5' } }
}
