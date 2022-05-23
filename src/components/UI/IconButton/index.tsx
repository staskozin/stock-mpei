import { MouseEventHandler } from 'react'
import s from './IconButton.module.scss'

const IconButton = (props: IconButtonProps) => {
  return (
    <button className={s.button} onClick={props.handler}>
      <img src={`/icon/${props.icon}.svg`} alt={props.icon} />
    </button>
  )
}

export default IconButton

type IconButtonProps = {
  icon: 'delete' | 'edit' | 'close'
  handler: MouseEventHandler<HTMLButtonElement>
}
