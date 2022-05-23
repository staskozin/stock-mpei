import { MouseEventHandler } from 'react'
import s from './Button.module.scss'

const Button = (props: ButtonProps) => {
  return (
    <button className={s.button} onClick={props.handler} disabled={props.disabled}>
      {props.text}
    </button>
  )
}

export default Button

type ButtonProps = {
  text: string
  handler: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
