//#region [Imports]
import React, { useState, useCallback } from 'react'
import { func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
//#endregion

const EmployeeAddDialog = ({ submitHandler, closeHandler }) => {
  //#region [Hooks]
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [role, setRole] = useState('driver')

  const focusRef = useCallback(node => {
    node && node.focus()
  }, [])
  //#endregion

  //#region [Constants]
  const classesForRoleBtnUnselected =
    'border-gray-400 text-gray-600 hover:bg-gray-300'
  const classesForRoleBtnSelected =
    'border-gray-700 bg-gray-700 text-white pointer-events-none'
  //#endregion

  //#region [Handlers]
  const handleFirstNameChange = ev => setFirstName(ev.target.value)
  const handleLastNameChange = ev => setLastName(ev.target.value)
  const handleEmailChange = ev => setEmail(ev.target.value)
  const handlePhoneChange = ev => setTelephone(ev.target.value)
  const curryHandleRoleChange = roleType => () => setRole(roleType)

  const handleSubmit = event => {
    event.preventDefault()
    submitHandler({
      firstName,
      lastName,
      email,
      telephone: telephone.replace(/[-,(,), ]/g, ''),
      role
    })
  }
  //#endregion

  //#region [JSX]
  return (
    <div className="fixed inset-0 z-30 ">
      <div
        onClick={closeHandler}
        className="fixed flex inset-0 z-40 items-start justify-center bg-black bg-opacity-50"
      >
        <div
          onClick={ev => ev.stopPropagation()}
          className="mt-32 p-6 bg-white rounded-sm shadow-md max-w-lg z-50"
        >
          <div className="text-lg text-gray-700 font-semibold border-b border-gray-400 pb-3">
            <h2 className="inline-block">Add New Employee</h2>
            <span
              className="text-center relative h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer float-right transform rotate-45 transition-colors duration-500 ease-in-out rounded-full hover:bg-gray-200"
              onClick={closeHandler}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="absolute top-3 left-4"
              />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-10">
              <div>
                <label className="text-gray-700" htmlFor="firstName">
                  First name:
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  ref={focusRef}
                  onChange={handleFirstNameChange}
                  className="px-2 w-full rounded border border-gray-300 text-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="lastName">
                  Last name:
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  onChange={handleLastNameChange}
                  className="px-2 w-full rounded border border-gray-300 text-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleEmailChange}
                  className="px-2 w-full rounded border border-gray-300 text-gray-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="telephone">
                  Phone number:
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  required
                  onChange={handlePhoneChange}
                  className="px-2 w-full rounded border border-gray-300 text-gray-700 focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-700">Role:</label>
                <div>
                  <button
                    type="button"
                    onClick={curryHandleRoleChange('driver')}
                    className={`px-6 py-1 focus:outline-none rounded-l border transition-colors duration-200 ease-in-out ${
                      role === 'driver'
                        ? classesForRoleBtnSelected
                        : classesForRoleBtnUnselected
                    }`}
                  >
                    Driver
                  </button>
                  <button
                    type="button"
                    onClick={curryHandleRoleChange('owner')}
                    className={`px-6 py-1 focus:outline-none border-t border-b transition-colors duration-200 ease-in-out ${
                      role === 'owner'
                        ? classesForRoleBtnSelected
                        : classesForRoleBtnUnselected
                    }`}
                  >
                    Owner
                  </button>
                  <button
                    type="button"
                    onClick={curryHandleRoleChange('other')}
                    className={`px-6 py-1 focus:outline-none rounded-r border transition-colors duration-200 ease-in-out ${
                      role === 'other'
                        ? classesForRoleBtnSelected
                        : classesForRoleBtnUnselected
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-3 border-t border-gray-400">
              <button
                type="reset"
                onClick={closeHandler}
                className="mt-3 mr-2 px-6 py-1 border border-gray-400 text-gray-600 rounded-sm hover:bg-gray-300 focus:outline-none transition-colors duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-3 px-6 py-1 bg-neon_blue text-white rounded-sm hover:bg-light_slate_blue focus:outline-none transition-colors duration-200 ease-in-out"
              >
                Create new employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
  //#endregion
}

//#region [Prop Types]
EmployeeAddDialog.propTypes = {
  submitHandler: func.isRequired,
  closeHandler: func.isRequired
}
//#endregion

export { EmployeeAddDialog }
