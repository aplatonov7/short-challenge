import React from 'react'
import s from './Layout.scss'

import Header from '../Header'
import UrlForm from '../../containers/UrlForm'
import UrlList from '../../containers/UrlList'

const Layout = () => (
  <main className={s.root}>
    <Header />
    <UrlForm />
    <UrlList />
  </main>
)

export default Layout