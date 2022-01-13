import React from 'react'
import { Link } from 'wouter'

const Button: React.FC<{ title: string; onClick?: any; to: string }> = ({
  title,
  to,
}) => {
  return (
    <Link
      className="bg-primary py-3 px-4 rounded-lg text-gray-100 font-serif font-semibold tracking-wide shadow-md hover:shadow-lg"
      href={to}
    >
      {title}
    </Link>
  )
}

export default Button
