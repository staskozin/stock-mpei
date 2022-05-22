import { MouseEventHandler } from 'react'
import s from './Button.module.scss'

const Button = (props: { text: string, handler: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className={s.button} onClick={props.handler}>
      {props.text}
    </button>
  )
}

export default Button
