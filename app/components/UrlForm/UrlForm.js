import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import s from './UrlForm.scss'
import classnames from 'classnames'

import UrlFormInput from '../UrlFormInput'
import Spinner from '../Spinner'

const UrlForm = ({ fields: { url, shortcode }, handleSubmit, submitting }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <div className={s.urlRow}>
      <UrlFormInput field={url} placeholder="Paste the link you want to shorten here" />
      <UrlFormInput className={s.shortcode} field={shortcode} placeholder="Specify code (optional)" />
    </div>

    <button className={s.btn} type="submit" disabled={shortcode.error || url.error || submitting}>
      {submitting ? <Spinner className={s.spinner} /> : 'Shorten this link'}
    </button>
  </form>
)

UrlForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default UrlForm