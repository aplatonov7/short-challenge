import React, { PropTypes } from 'react'
import s from './UrlList.scss'

import UrlListTable from '../UrlListTable'
import Spinner from '../Spinner'

const UrlList = ({ links, loading, error, clearHistory }) => {
  let content

  if (loading) {
    content = <Spinner className={s.spinner}/>
  } else if (error) {
    content = <p className={s.error}>{error}</p>
  } else if (links.length === 0) {
    content = <p className={s.notification}>No links saved in history</p>
  } else {
    content = <UrlListTable links={links}/>
  }

  return (
    <div className={s.root}>
      <header className={s.header}>
        <h2 className={s.heading}>Previously shortened by you</h2>
        <button className={s.clear} onClick={clearHistory}>Clear history</button>
      </header>

      {content}
    </div>
  )
}

UrlList.propTypes = {
  links: PropTypes.array.isRequired,
  clearHistory: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default UrlList