import React, { PropTypes } from 'react'
import s from './UrlListTable.scss'

import UrlListElement from '../UrlListElement'

const UrlListTable = ({ links }) => (
  <table className={s.table}>
    <thead>
      <tr>
        <th className={s.th}>Link</th>
        <th className={s.th}>Visits</th>
        <th className={s.th}>Last visited</th>
      </tr>
    </thead>

    <tbody>
      {links.map((el, index) => <UrlListElement {...el} newlyAdded={el.newlyAdded && index === 0} key={el.shortcode} />)}
    </tbody>
  </table>
)

UrlListTable.propTypes = {
  links: PropTypes.array.isRequired
}

export default UrlListTable