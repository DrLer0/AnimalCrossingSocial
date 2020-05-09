const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validatePostInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
   
    if(!Validator.isLength(data.title,{min: 10, max : 300})){
        errors.title = 'Title must be between 10 and 300 characters'
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Title field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}