import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ItemsList } from 'client/Components/Items/ItemsList'
import { ErrorBoundary } from 'client/Components/ErrorBoundary'
import * as itemsActions from 'client/actions/items'

export class Items extends Component {
  static propTypes = {
    error: PropTypes.func,
    fetchItemsAction: PropTypes.func,
    items: PropTypes.array,
    loading: PropTypes.bool
  }

  constructor(props) {
    super(props)

    let data
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.data
    }
    this.state = { data }
  }

  componentWillMount() {
    const { items, loading } = this.props

    if (!items && !loading) {
      this.fetchItems()
    }
  }

  componentWillUpdate (prevProps) {
    const { path } = this.props.match

    if (prevProps.match.path !== path) {
      this.fetchItems()
    }
  }

  fetchItems = () => {
    const { fetchItemsAction, match: { path } } = this.props

    fetchItemsAction(path)
  }

  render() {
    const { data } = this.state
    const items = data && data || this.props.items

    if (!items || this.props.loading) {
      return <p>LOADING</p>
    } else {
      return (
        <ErrorBoundary>
          <ItemsList items={items} />
        </ErrorBoundary>
      )
    }
  }
}

const mapStateToProps = ({ itemsReducer }) => ({
  error: itemsReducer.error,
  items: itemsReducer.items,
  loading: itemsReducer.loading,
})

const mapDispatchToProps = ({
  fetchItemsAction: itemsActions.fetchItems
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items)
