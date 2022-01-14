import React from 'react'
import { cx } from '../../utils'

type InputProps = {
  label: string
  name: string
  value: string
  placeholder?: string
  errorMessage?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
}) => {
  return (
    <label className="block">
      <span
        className={cx('text-lg', [
          !!errorMessage,
          'text-red-700',
          'text-gray-700',
        ])}
      >
        {label}
      </span>

      <input
        type="text"
        name={name}
        className={cx('mt-1 block w-full rounded-md shadow-sm  focus:ring-0', [
          !!errorMessage,
          'border-red-700 focus:border-red-700',
          'border-gray-300 focus:border-primary',
        ])}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {errorMessage ? (
        <span className="block text-red-700 text-base mt-1">
          {errorMessage}
        </span>
      ) : null}
    </label>
  )
}

export default Input
