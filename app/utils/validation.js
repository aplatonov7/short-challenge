/* Inspired by https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/utils/validation.js */
const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ]

export function required(message = 'Required') {
  return value => {
    if (isEmpty(value)) {
      return message
    }
  }
}

export function match(pattern, message = 'Do not match') {
  return (value) => {
    if (!isEmpty(value) && !pattern.test(value)) {
      return message
    }
  }
}

/* Regexp is from http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text */
export const url = (message = 'Not a valid URL') => match(
  /^(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?$/,
  message
)

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}