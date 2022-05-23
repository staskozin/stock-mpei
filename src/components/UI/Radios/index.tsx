import s from './Radios.module.scss'

const Radios = (props: RadiosProps) => {
  return (
    <div className={s.radios}>
      <span>{props.text}</span>
      {props.children}
    </div>
  )
}

export default Radios

type RadiosProps = {
  text: string
  children?: React.ReactNode[]
}
