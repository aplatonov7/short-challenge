import React, { PropTypes } from 'react'
import s from './Spinner.scss'
import classnames from 'classnames'

/* Styles and markup borrowed from https://codepen.io/jczimm/pen/vEBpoL */
const Spinner = ({ className }) => (
  <div className={className}>
    <div className={s.loader}>
      <svg className={s.circular} viewBox="25 25 50 50">
        <circle className={s.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    </div>
  </div>
)

Spinner.propTypes = {
  className: PropTypes.string
}

export default Spinner