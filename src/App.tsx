//#region [Imports]
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import { Sidebar, Header } from './components'
import { useOnline } from './utils/custom-hooks'
import { EmployeeGrid, CustomerGrid, OrderGrid } from './components/grids'
import PouchDB from 'pouchdb-browser'
import { Provider as PouchProvider } from 'use-pouchdb'
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
  useOnline(({ status }) => {
    notify.show(`Application is ${status}`, 'custom', 5000, {
      background: '#FAf6f6',
      text: '#777'
    })
  })
  //#endregion

  //#region [Handlers]
  const handleSidebarOpen = () => setSidebarOpen(true)
  const handleSidebarClose = () => setSidebarOpen(false)
  //#endregion

  //#region [JSX]
  return (
    <PouchProvider pouchdb={localWriteDB}>
      <Notifications />
      <Router>
        <div className="flex h-screen bg-gray-200 font-roboto">
          <Sidebar handleClose={handleSidebarClose} sidebarOpen={sidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header
              handleSidebarOpen={handleSidebarOpen}
              handleSidebarClose={handleSidebarClose}
              sidebarOpen={sidebarOpen}
            />
            <main className="flex-1 h-full overflow-x-hidden overflow-y-auto bg-gray-200">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<EmployeeGrid />} />
                <Route path="/customers" element={<CustomerGrid />} />
                <Route path="/orders" element={<OrderGrid />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </PouchProvider>
  )
  //#endregion
}

const Home = () => (
  <div className="h-full transform -translate-y-32 text-gray-700">
    <div className="text-5xl text-center flex flex-col h-full justify-center">
      <h2>
        <span>Welcome to </span>
        <span className="font-fira_sans text-navy font-semibold">grow</span>
        <span className="font-fira_sans italic text-neon_blue font-semibold">
          flow
        </span>
        <span className="ml-2">!</span>
      </h2>
    </div>
  </div>
)

export default App
