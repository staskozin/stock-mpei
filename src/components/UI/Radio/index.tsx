import { ChangeEventHandler } from 'react'

import s from './Radio.module.scss'

const Radio = (props: RadioProps) => {
  return (
    <label className={s.radio}>
      <input
        type='radio'
        onChange={props.handler}
        checked={props.checked}
      />
      <span>{props.text}</span>
    </label>
  )
}

export default Radio

type RadioProps = {
  handler: ChangeEventHandler<HTMLInputElement>
  checked: boolean
  text: string
}
