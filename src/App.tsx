//#region [Imports]
import React, { useState } from 'react'
import { Sidebar, Header } from './components'
import { EmployeeGrid } from './components/grid'
import PouchDB from 'pouchdb-browser'
import { Provider } from 'use-pouchdb'
import { pouchConfig } from '../package.json'
//#endregion

//#region [banana] [Setup PouchDB & start server sync]
const remotePouchUrl = `${pouchConfig.remoteEndpoint}/${pouchConfig.writeEmployeeDB}`
const localWriteDB = new PouchDB(pouchConfig.writeEmployeeDB)
const remoteWriteDB = new PouchDB(remotePouchUrl)

localWriteDB.sync(remoteWriteDB, {
  live: true, // Continuously sync between local and remote.
  retry: true // Retry on connection lost.
})
//#endregion

const App = () => {
  //#region [Hooks]
  const [sidebarOpen, setSidebarOpen] = useState(true)
  //#endregion

  //#region [Handlers]
  const handleSidebarOpen = () => setSidebarOpen(true)
  const handleSidebarClose = () => setSidebarOpen(false)
  //#endregion

  //#region [JSX]
  return (
    <Provider pouchdb={localWriteDB}>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <Sidebar handleClose={handleSidebarClose} sidebarOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            handleSidebarOpen={handleSidebarOpen}
            handleSidebarClose={handleSidebarClose}
            sidebarOpen={sidebarOpen}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="">
              <EmployeeGrid />
            </div>
          </main>
        </div>
      </div>
    </Provider>
  )
  //#endregion
}

export default App
