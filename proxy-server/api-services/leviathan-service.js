const fetch = require('node-fetch')
const config = require('./service-config')
const schema = require('./validation-schemas')

const getAllEmployees = async () => {
  const url = `${config.API_ENDPOINT}/employee/?ApiUser=${config.API_USER}&ApiKey=${config.API_KEY}`

  return await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: config.JSON_CONTENT_TYPE
  }).then(res => {
    if (res.ok) return { status: res.status, promise: res.json() }

    return { status: res.status, promise: res.text() }
  })
}

const createEmployee = async data => {
  const url = `${config.API_ENDPOINT}/employee`

  let { value, error } = schema.employee.validate(data)
  if (error) {
    return { status: 412, promise: Promise.resolve(error) }
  }

  return await fetch(url, {
    method: 'POST',
    headers: config.JSON_CONTENT_TYPE,
    body: JSON.stringify({
      ...value,
      ApiUser: config.API_USER,
      ApiKey: config.API_KEY
    })
  }).then(res => {
    if (res.ok) return { status: res.status, promise: res.json() }

    return { status: res.status, promise: res.text() }
  })
}

const getAllCustomers = async () => {
  const url = `${config.API_ENDPOINT}/customer/get-all/?ApiUser=${config.API_USER}&ApiKey=${config.API_KEY}`

  return await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: config.JSON_CONTENT_TYPE
  }).then(res => {
    if (res.ok) return { status: res.status, promise: res.json() }

    return { status: res.status, promise: res.text() }
  })
}

module.exports = { getAllEmployees, createEmployee, getAllCustomers }
