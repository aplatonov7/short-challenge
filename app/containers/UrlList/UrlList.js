import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { load, clearHistory } from '../../redux/modules/links'

import UrlListComponent from '../../components/UrlList'

class UrlList extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string
  }

  constructor(props) {
    super(props)

    props.load()
  }

  render() {
    return <UrlListComponent {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  links: state.links.items,
  loading: state.links.loading,
  error: state.links.error
})

export default connect(mapStateToProps, { load, clearHistory })(UrlList)