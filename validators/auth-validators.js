const Joi = require("joi");

// Creating an object schema for the signup/register form
const signupSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .trim()
        .min(3)
        .max(40)
        .required()
        .messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name cannot be an empty field',
            'string.min': 'Name must be at least {#limit} characters long',
            'string.max': 'Name must be less than or equal to {#limit} characters long',
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required'
        }),
    age: Joi.number()
        .min(18)
        .required()
        .messages({
            'number.base': 'Age should be a type of number',
            'number.min': 'Minimum age to this service is {#limit} years',
            'any.required': 'Age is required'
        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alphanumeric characters',
            'any.required': 'Password cannot be empty'
        }),
    city: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'City should be a type of text',
            'string.empty': 'City cannot be an empty field',
            'string.min': 'City must be at least {#limit} characters long',
            'string.max': 'City must be less than or equal to {#limit} characters long',
            'any.required': 'City is required'
        }),
    zip_code: Joi.string()
        .pattern(new RegExp('^[0-9]{6,11}$'))
        .required()
        .messages({
            'string.pattern.base': 'Zip code must be between 6 and 11 digits',
            'any.required': 'Zip code is required'
        })
});

// Creating an object schema for the login form
const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alphanumeric characters',
            'any.required': 'Password cannot be empty'
        })
});

// Creating an object schema to delete
const deleteUserSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alphanumeric characters',
            'any.required': 'Password cannot be empty'
        })
});

module.exports = { signupSchema, loginSchema, deleteUserSchema };
