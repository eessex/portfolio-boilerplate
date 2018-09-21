import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import * as itemActions from 'client/actions/item'
import { ErrorBoundary } from 'client/Components/ErrorBoundary'
import { ItemPage } from 'client/Components/Item/ItemPage'
const appTitle = process.env.PAGE_TITLE

export class Item extends Component {
  constructor(props) {
    super(props)

    let item
    if (__isBrowser__) {
      item = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      item = props.staticContext.data
    }
    this.state = { item }
  }

  componentWillMount () {
    const { item } = this.state

    if (!item && !this.props.loading) {
      this.fetchItem()
    }
  }

  fetchItem = () => {
    const {
      fetchItemAction,
      match: { params: { id } },
      model
    } = this.props

    fetchItemAction(model, id)
  }

  render() {
    const { error, loading } = this.props
    const item = this.state.item || this.props.item
    const pageTitle = `${appTitle}${item && item.title ? ` | ${item.title}` : ''}`

    return (
      <div>
        <ErrorBoundary>
          {loading && <p>LOADING</p>}
          {error && <p>{error.message}</p>}
          {item &&
            <div>
              <Helmet>
                <title>{pageTitle}</title>
              </Helmet>
              <ItemPage item={item} />
            </div>
          }
        </ErrorBoundary>
      </div>
    )
  }
}


const mapStateToProps = ({ itemReducer }) => ({
  error: itemReducer.error,
  item: itemReducer.item,
  loading: itemReducer.loading,
})

const mapDispatchToProps = ({
  fetchItemAction: itemActions.fetchItem
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
