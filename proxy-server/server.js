//#region [Imports]
const bodyParser = require('body-parser')
const express = require('express')
const PouchDB = require('pouchdb')
const schema = require('./api-services/validation-schemas')
const LeviathonAPI = require('./api-services/leviathan-service')
//#endregion

//#region [brick] - [Setup PouchDB and listen for changes]
const MAX_ATTEMPTS_TO_CREATE_EMPLOYEE = 3
const WRITE_EMPLOYEE_DB_URL = 'http://127.0.0.1:5984/write-employee'
const writeEmployeeDB = new PouchDB(WRITE_EMPLOYEE_DB_URL)

// Process any records already in the pouch queue on server startup.
writeEmployeeDB
  .info()
  .then(info => {
    console.log(`\n✨PouchDB [write-employee] Info: ✨\n`, info)

    if (info.doc_count) {
      writeEmployeeDB
        .allDocs({
          include_docs: true
        })
        .then(({ rows: recs }) => {
          console.log(recs)
          if (recs) {
            recs
              .filter(
                rec =>
                  !(
                    rec.doc.created &&
                    rec.doc.created.attempts >= MAX_ATTEMPTS_TO_CREATE_EMPLOYEE
                  )
              )
              .forEach(rec => {
                postToApiThenRemoveFromQueue(rec)
              })
          }
        })
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(`🐵 PouchDB connection refused.\n ${error}`))

// Subscribe to pouch change event so we can listen and process pouch queue.
writeEmployeeDB
  .changes({
    since: 'now',
    live: true,
    include_docs: true
  })
  .on('change', change => {
    if (!change.deleted && change.doc._rev.startsWith('1-')) {
      postToApiThenRemoveFromQueue(change)
    }

    console.log('✨ Change record fired: \n', change)
  })

const postToApiThenRemoveFromQueue = queuedItem => {
  console.log('Attempting postToApiThenRemoveFromQueue()\n', queuedItem)
  const doc = queuedItem.doc
  const employee = {
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    telephone: doc.telephone,
    role: doc.role
  }

  let { value, error } = schema.employee.validate(employee)
  if (!error) {
    LeviathonAPI.createEmployee(value).then(data => {
      if (data.status === 200) {
        console.log('✨ Create employee successful\n', queuedItem)
        writeEmployeeDB.remove(queuedItem.doc)
      } else {
        data.promise.then(txt => {
          // let created = {
          //   success: false,
          //   attempts: 1,
          //   reason: txt,
          //   time: Date.now()
          // }

          // if (queuedItem.doc.created) {
          //   created = {
          //     ...created,
          //     attempts: ++queuedItem.doc.created.attempts
          //   }
          // }
          // queuedItem.doc.created = created
          // if (created.attempts <= MAX_ATTEMPTS_TO_CREATE_EMPLOYEE) {
          //   setTimeout(() => {
          //     console.log(
          //       'Attempted but failed to create employee\n',
          //       '' //queuedItem
          //     )
          //     // writeEmployeeDB.put(queuedItem)
          //   }, 1000 * 30)
          // }

          console.log(
            '🐵 Leviathan API createEmployee() failed!\n',
            `Response > status:'${data.status}', reason:'${txt}'`
          )
        })
      }
    })
  } else {
    console.log(`😱 Validation error - [${error}]\n`, employee)
  }
}
//#endregion

//#region [grass] [Setup middleware]
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use((req, res, next) => {
  // Allow CORS
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
//#endregion

//#region [navy] GET - [Read Request Route Handlers]
app.get('/api/employees', (req, res) => {
  LeviathonAPI.getAllEmployees().then(({ status, promise }) => {
    if (status === 200) {
      promise.then(data => {
        res.status(200).send(data)
      })
    } else {
      res.status(status).send(`Oops!😞 ...status returned is ${status}`)
    }
  })
})

app.get('/api/customers', (req, res) => {
  LeviathonAPI.getAllCustomers().then(({ status, promise }) => {
    if (status === 200) {
      promise.then(data => {
        res.status(200).send(data)
      })
    } else {
      res.status(status).send(`Oops!😞 ...status returned is ${status}`)
    }
  })
})
//#endregion

//#region [clay] POST - [Create Request Route Handlers]
// app.post('/api/employees', (req, res) => {
//   let { value, error } = employeeValidateSchema.validate(JSON.parse(req.body))

//   if (!error) {
//   } else {
//   }

//   const data = { ...req.body, ApiUser: API_USER, ApiKey: API_KEY }
// })
//#endregion

//#region [charcoal] DELETE - [Delete Request Route Handlers]
app.delete('/api/employees/:id', (req, res) => {
  res.status(500).send('`DELETE` not implemented.')
})
//#endregion

//#region [orange] - [Start/Stop App]
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port}..`))
//#endregion
