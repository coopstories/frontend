import React from 'react'
import { Link } from 'wouter'

type ButtonProps = {
  title: string
  isLoading?: boolean
  to?: string
  onClick?: any
}

const Spinner: React.FC = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white inline-block"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const Button: React.FC<ButtonProps> = ({ title, isLoading, to, onClick }) => {
  const classes =
    'bg-primary py-3 px-4 rounded-lg text-gray-100 font-serif font-semibold tracking-wide shadow-md hover:shadow-lg'

  if (!to) {
    return (
      <button className={classes} onClick={onClick}>
        {isLoading ? <Spinner /> : null}

        <span>{title}</span>
      </button>
    )
  }

  return (
    <Link className={classes} href={to}>
      {title}
    </Link>
  )
}

export default Button
