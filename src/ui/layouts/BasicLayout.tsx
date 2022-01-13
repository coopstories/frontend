import React from 'react'
import { LANDING } from '../../app/routes'
import Button from '../components/Button'
import NavBar from '../components/NavBar'

const BasicLayout: React.FC<{ customNavBarActions?: React.ReactNode }> = ({
  customNavBarActions,
  children,
}) => {
  return (
    <>
      <NavBar
        actionsSlot={
          customNavBarActions ? (
            customNavBarActions
          ) : (
            <Button title="How it works" to={LANDING.linkTo()} />
          )
        }
      />

      <div className="py-6 px-5 sm:px-10">
        <div className="max-w-2xl mx-auto">{children}</div>
      </div>
    </>
  )
}

export default BasicLayout
