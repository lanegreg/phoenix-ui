//#region [Imports]
import React from 'react'
import { bool, func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight
} from '@fortawesome/free-regular-svg-icons'
//#endregion

const Header = ({ handleSidebarOpen, handleSidebarClose, sidebarOpen }) => {
  //#region [JSX]
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white">
      <div className="flex items-center">
        <button
          className="text-gray-500 focus:outline-none scale-105 transform duration-100 hover:scale-110 hover:text-neon_blue"
          onClick={sidebarOpen ? handleSidebarClose : handleSidebarOpen}
        >
          <FontAwesomeIcon
            icon={sidebarOpen ? faArrowAltCircleLeft : faArrowAltCircleRight}
            className="w-10"
          />
        </button>
      </div>

      <div className="flex items-center">
        <button className="flex mx-4 text-gray-600 focus:outline-none">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative">
          <button className="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
              alt="Your avatar"
            />
          </button>

          <div className="hidden fixed inset-0 h-full w-full z-10"></div>

          <div className="hidden absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            >
              Profile
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            >
              Products
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  )
  //#endregion
}
//#region [Prop Types]
Header.propTypes = {
  handleSidebarOpen: func.isRequired,
  handleSidebarClose: func.isRequired,
  sidebarOpen: bool.isRequired
}
//#endregion

export { Header }
