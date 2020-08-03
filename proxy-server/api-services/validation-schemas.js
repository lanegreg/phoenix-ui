const Joi = require('@hapi/joi')

const employee = Joi.object().keys({
  firstName: Joi.string().trim().alphanum().min(2).max(25).required(),
  lastName: Joi.string().trim().alphanum().min(2).max(25).required(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  telephone: Joi.string()
    .trim()
    .regex(/^[0-9]{7,10}$/)
    .required(),
  role: Joi.string().trim().empty('').alphanum().default('other').min(2)
})

module.exports = { employee }
