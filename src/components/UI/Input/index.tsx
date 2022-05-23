import { ChangeEventHandler } from 'react'

import s from './Input.module.scss'

const Input = (props: InputProps) => {
  return (
    <label className={s.label}>
      <span>{props.label}</span>
      <input
        type={props.type}
        value={props.value}
        onChange={props.handler}
        placeholder={props.placeholder}
      />
    </label>
  )
}

export default Input

type InputProps = {
  handler: ChangeEventHandler<HTMLInputElement>
  label: string
  value: string | number
  type: 'text' | 'number'
  placeholder?: string
}
