//#region [Imports]
import React from 'react'
import { bool, func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import {
  faSmile,
  faEnvelope,
  faHeart,
  faFileAlt,
  faIdBadge
} from '@fortawesome/free-regular-svg-icons'
//#endregion

const Sidebar = ({ handleClose, sidebarOpen }) => {
  //#region [JSX]
  return (
    <>
      <div
        id="click-off-mask"
        onClick={handleClose}
        className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      ></div>

      <aside
        className={`z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-navy overflow-y-auto lg:inset-0 ${
          sidebarOpen
            ? 'static translate-x-0 ease-out'
            : 'fixed -translate-x-full ease-in'
        }`}
      >
        <div className="font-fira_sans text-4xl flex items-center justify-center mt-6">
          <span className="text-white">grow</span>
          <span className="italic text-neon_blue">flow</span>
        </div>
        <nav className="mt-10">
          <a
            className="flex items-center mt-4 py-2 px-6 border-l-4 bg-neon_blue text-gray-100 border-gray-100"
            href="/"
          >
            <FontAwesomeIcon icon={faIdBadge} />
            <span className="mx-5">Employees</span>
          </a>

          <a
            className="flex items-center mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            href="/"
          >
            <FontAwesomeIcon icon={faSmile} />
            <span className="mx-4">Customers</span>
          </a>

          <a
            className="flex items-center mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            href="/"
          >
            <FontAwesomeIcon icon={faFileAlt} />
            <span className="mx-5">Orders</span>
          </a>

          <a
            className="flex items-center mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            href="https://www.growflow.com"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="mx-4">Messages</span>
          </a>

          <a
            className="flex items-center mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            href="https://www.growflow.com"
          >
            <FontAwesomeIcon icon={faHeart} />
            <span className="mx-4">Favorites</span>
          </a>

          <a
            className="flex items-center mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            href="https://www.growflow.com"
          >
            <FontAwesomeIcon icon={faCog} />
            <span className="mx-4">Settings</span>
          </a>
        </nav>
      </aside>
    </>
  )
  //#endregion
}

//#region [Prop Types]
Sidebar.propTypes = {
  handleClose: func.isRequired,
  sidebarOpen: bool.isRequired
}
//#endregion

export { Sidebar }
