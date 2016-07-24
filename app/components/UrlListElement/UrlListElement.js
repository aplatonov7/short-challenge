import React, { PropTypes } from 'react'
import s from './UrlListElement.scss'
import classnames from 'classnames'
import { timeSince } from '../../utils/formatters'
import { API_URL } from '../../config'

import CopyToClipboard from 'react-copy-to-clipboard'

const UrlListElement = ({ lastSeenDate, redirectCount, origin, shortcode, newlyAdded }) => (
  <tr className={classnames(s.row, { [s.highlightedRow]: newlyAdded })}>
    <td className={classnames(s.cell, s.urlCell)}>
      <div className={classnames(s.hwrap, { [s.highlighted]: newlyAdded })}>
        <div>
          <a href={API_URL + shortcode} title={API_URL + shortcode} target="_blank" className={s.shortLink}>
            shooooort.com/<span className={s.shortcode}>{shortcode}</span>
          </a>

          <CopyToClipboard text={API_URL + shortcode}>
            <button className={s.copy}>Click to copy this link</button>
          </CopyToClipboard>
        </div>

        <div className={s.originRow}>
          <a className={s.origin} href={origin} title={origin} target="_blank">{origin}</a>
        </div>
      </div>
    </td>

    <td className={classnames(s.cell, s.visitsCell)}>
      <div className={s.mobileLabel}>Visits</div>
      {redirectCount}
    </td>

    <td className={classnames(s.cell, s.lastVisitedCell)}>
      <div className={s.mobileLabel}>Last visited</div>
      {redirectCount === 0 ? 'never' : timeSince(lastSeenDate)}
    </td>
  </tr>
)

UrlListElement.propTypes = {
  lastSeenDate: PropTypes.number.isRequired,
  redirectCount: PropTypes.number.isRequired,
  origin: PropTypes.string.isRequired,
  shortcode: PropTypes.string.isRequired,
  newlyAdded: PropTypes.bool
}

export default UrlListElement