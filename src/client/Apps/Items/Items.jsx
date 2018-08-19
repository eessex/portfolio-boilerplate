import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ItemTeaser } from 'client/Components/Item/ItemTeaser'
import { ErrorBoundary } from 'client/Components/ErrorBoundary'

export class Items extends Component {
  static propTypes = {
    data: PropTypes.object
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

  fetchItems = (query) => {
    this.setState(() => ({ data: {} }))

    this.props.fetchInitialData(query)
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
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <ItemTeaser item={item} />
              </li>
            ))
            }
          </ul>
        </ErrorBoundary>
      )
    }
  }
}
