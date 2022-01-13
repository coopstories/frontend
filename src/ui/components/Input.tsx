import React from 'react'

type InputProps = {
  label: string
  name: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <label className="block">
      <span className="text-gray-700 text-lg">{label}</span>

      <input
        type="text"
        name={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
        
        focus:border-primary focus:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  )
}

export default Input
