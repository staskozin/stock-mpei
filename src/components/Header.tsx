import { NavLink } from 'react-router-dom'

import s from './Header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <nav>
        <NavLink
          to='/'
          className={({ isActive }) => isActive ? `${s.link} ${s.selected}` : s.link}
        >Склад</NavLink>
        <NavLink
          to='/orders'
          className={({ isActive }) => isActive ? `${s.link} ${s.selected}` : s.link}
        >Заказы</NavLink>
      </nav >
    </header >
  )
}

export default Header
