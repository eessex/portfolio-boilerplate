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

    let data
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.data
    }
    this.state = { data }
  }

  componentWillMount () {
    if (!__isBrowser__) return
    const { item, loading, match: { params } } = this.props
    const isNewId = item && (params.id !== item.id.toString())

    if ((!item && !loading) || isNewId) {
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
    const { data } = this.state
    const { error, loading } = this.props
    const item = data && data || this.props.item
    
    if (!item || loading) {
      return <p>LOADING</p>
    } else {
      const pageTitle = `${appTitle}${item.title ? ` | ${item.title}` : ''}`

      return (
        <div>
          <ErrorBoundary>
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
