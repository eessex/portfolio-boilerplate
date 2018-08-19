import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ItemTeaser } from 'client/Components/Item/ItemTeaser'
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

  componentDidMount () {
    const { data } = this.state
    const { path } = this.props.match

    if (!data || data && !data.items) {
      this.fetchItems(path)
    }
  }

  componentWillUpdate (prevProps) {
    const { path } = this.props.match

    if (prevProps.match.path !== path) {
      this.fetchItems(path)
    }
  }

  fetchItems = query => {
    this.setState(() => ({ data: {} }))

    this.props.fetchItemsAction(query)
      .then(data => {
        this.setState(() => ({ data }))
    })
  }

  render() {
    const { data } = this.state
    const items = data && data.items || []

    if (!data) {
      return <p>LOADING</p>
    } else {
      return (
        <ErrorBoundary>
          <div>
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  <ItemTeaser item={item} />
                </li>
              ))
              }
            </ul>
          </div>
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
