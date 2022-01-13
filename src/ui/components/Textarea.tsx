import React from 'react'

type TextareaProps = {
  label: string
  name: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <textarea
        className="
          mt-1 block w-full rounded-md border-gray-300 shadow-sm

        focus:border-primary focus:ring-0
        "
        rows={7}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  )
}

export default Textarea
