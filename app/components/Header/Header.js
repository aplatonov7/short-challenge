import React from 'react'
import s from './Header.scss'

const Header = () => (
  <header className={s.root}>
    <a href="/" className={s.logo}>Shooooort</a>

    <div className={s.motto}>The link shortener with a long name</div>
  </header>
)

export default Header