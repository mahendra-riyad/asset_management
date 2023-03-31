const {Joi} = require('celebrate')

module.exports = {
    VALIDATION: {
        USER: {
            EMAIL: Joi.string().trim().email(),
            PASSWORD: Joi.string().min(6).max(32),
            NAME: Joi.string().trim().min(2).max(40)
        },
        ASSET: {
            ID: Joi.string().regex(/^[a-f\d]{24}$/i),
            NAME: Joi.string().min(3).max(260),
            DATE: Joi.string(),
            DESCRIPTION: Joi.string().min(3).max(1000),
            IMAGE: Joi.string(),
            LOCATION: Joi.string(),
            TAGS: Joi.string(),
            SEARCH: Joi.string(),
            SORT_BY: Joi.string()
        }
    }
}