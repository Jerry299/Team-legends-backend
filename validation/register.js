const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = validateRegisterInput = data => {
  let errors = {}

  data.fullName = !isEmpty(data.fullName) ? data.fullName : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : ''

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = 'FullName field is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (!Validator.isLength(data.fullName, { min: 6, max: 30 })) {
    errors.fullName = 'FullName must be more than 5 characters'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be more than 5 characters'
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Please confirm password'
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Password must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
