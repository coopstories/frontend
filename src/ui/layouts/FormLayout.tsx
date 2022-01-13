import React from 'react'

const FormLayout: React.FC = ({ children }) => {
  return (
    <div className="py-6 px-5 sm:px-10">
      <div className="max-w-2xl mx-auto">{children}</div>
    </div>
  )
}

export default FormLayout
