import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import api from '../../utils/api'
import UrlFormValidation from './UrlFormValidation'

import { addNewLink } from '../../redux/modules/links'

import UrlFormComponent from '../../components/UrlForm'

class UrlForm extends Component {
  static propTypes = {
    addNewLink: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values, dispatch) {
    return api.shorten(values.url, values.shortcode)
      .then(shortcode => {
        this.props.addNewLink(shortcode, values.url)
        this.props.resetForm()
      })
  }

  render() {
    const handleSubmit = this.props.handleSubmit(this.onSubmit)

    return <UrlFormComponent {...this.props} handleSubmit={handleSubmit} />
  }
}

UrlForm = reduxForm({
  form: 'url',
  fields: ['url', 'shortcode'],
  validate: UrlFormValidation
})(UrlForm)

export default connect(_ => ({}), { addNewLink })(UrlForm)