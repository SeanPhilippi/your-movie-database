const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterInput = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.username, {min: 4, max: 20})) {
    errors.username = 'Name must be between 4 and 20 characters';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
 }
 if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
 }
 if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters';
 }
 if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
 }
 if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
 }
 return {
    errors: errors,
    isValid: isEmpty(errors)
 }
}

module.exports = validateRegisterInput;