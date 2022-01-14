import React, { useMemo } from 'react'
import { cx } from '../../utils'

type TextareaProps = {
  label: string
  name: string
  value: string
  placeholder?: string
  errorMessage?: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
}) => {
  const characterCount = useMemo(() => value.length, [value])

  return (
    <label className="block">
      <p
        className={cx('text-lg flex justify-between items-center', [
          !!errorMessage,
          'text-red-700',
          'text-gray-700',
        ])}
      >
        <span>{label}</span>
        <span className="text-sm">{characterCount} characters</span>
      </p>

      <textarea
        className={cx('mt-1 block w-full rounded-md shadow-sm focus:ring-0', [
          !!errorMessage,
          'border-red-700 focus:border-red-700',
          'border-gray-300 focus:border-primary',
        ])}
        rows={7}
        name={name}
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

export default Textarea
