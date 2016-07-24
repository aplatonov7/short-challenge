import React, { PropTypes } from 'react'
import s from './UrlFormInput.scss'
import classnames from 'classnames'

const UrlFormInput = ({ field, placeholder, className }) => (
  <div>
    <input
      {...field}
      className={classnames(s.input, className, {[s.error]: field.touched && field.error})}
      type="text"
      placeholder={placeholder} />

    <div className={classnames(s.errorDesc, {[s.show]: field.touched && field.error})}>
      {field.touched && field.error ? field.error : "" }
    </div>
  </div>
)

UrlFormInput.propTypes = {
  field: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
}

export default UrlFormInput