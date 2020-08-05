import { useEffect, useState } from 'react'
import PouchDB from 'pouchdb-browser'
import { useAllDocs } from 'use-pouchdb'
import { employeeSchema } from './validation-schemas'
import { pouchConfig } from '../../package.json'
import uuid from '../utils/uuid'
import { ENDPOINT, JSON_CONTENT_TYPE } from './service-config'

// const url = `${ENDPOINT}/employee/?ApiUser=${API_USER}&ApiKey=${API_KEY}`
const url = `${ENDPOINT}/employees`
const writeDB = new PouchDB(pouchConfig.writeEmployeeDB)

const useEmployeesData = () => {
  const [employees, setEmployees] = useState([])

  const { rows: cachedEmployees, error } = useAllDocs({
    include_docs: true
  })

  useEffect(() => {
    getAllEmployees().then(data => {
      if (data.status === 200) {
        data.promise.then(json => {
          json.reverse()
          setEmployees([...cachedEmployees.map(item => item.doc), ...json])
        })
      }
    })
  }, [cachedEmployees, error])

  return employees
}

const getAllEmployees = async () => {
  return await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: { ...JSON_CONTENT_TYPE }
  }).then(res => {
    if (res.ok) {
      return { status: res.status, promise: res.json() }
    }

    return { status: res.status, promise: res.text() }
  })
}

const createEmployee = async data => {
  let { value, error } = employeeSchema.validate(data)
  if (error) {
    return { status: 412, promise: Promise.resolve(error) }
  }

  return await writeDB.put({
    ...value,
    _id: uuid()
  })
}

export { createEmployee, useEmployeesData }
