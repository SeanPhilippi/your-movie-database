const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) { 
    errors.email = 'Email field is required'; 
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password filed is required';
  }
  if (!Validator.isLength(data.password, { min: 8, max: 30})) { 
    errors.password = 'Password must be at least 8 characters';
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLoginInput;