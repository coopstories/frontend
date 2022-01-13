import React from 'react'
import { Link } from 'wouter'
import { LANDING } from '../../app/routes'

const NavBar: React.FC<{ actionsSlot?: React.ReactNode }> = ({
  actionsSlot,
}) => {
  return (
    <nav className="py-6 px-5 sm:px-10 bg-secondary">
      <div className="max-w-4xl mx-auto flex justify-between content-center">
        <Link href={LANDING.linkTo()}>
          <h1 className="font-sans text-3xl text-gray-50 cursor-pointer font-bold">
            CooStories
          </h1>
        </Link>

        <div className="space-x-6 my-auto">{actionsSlot}</div>
      </div>
    </nav>
  )
}

export default NavBar
