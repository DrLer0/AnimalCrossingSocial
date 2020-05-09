const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validatePostInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
   
    if(!Validator.isLength(data.title,{min: 1, max : 60})){
        errors.title = 'Title must be between 1 and 60 characters'
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Title field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}