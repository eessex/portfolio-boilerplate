import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ErrorBoundary } from 'client/Components/ErrorBoundary'
import { Helmet } from 'react-helmet'
import { ItemPage } from 'client/Components/Item/ItemPage'
import * as itemActions from 'client/actions/item'
const appTitle = process.env.PAGE_TITLE

export class Item extends Component {
  constructor (props) {
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
    const isNewId = item && (params.slug !== item.slug.toString())

    if ((!item && !loading) || isNewId) {
      this.fetchItem()
    }
  }

  fetchItem = () => {
    const {
      fetchItemAction,
      match: { params: { slug } },
      model
    } = this.props

    fetchItemAction(model, slug)
  }

  render () {
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
  loading: itemReducer.loading
})

const mapDispatchToProps = ({
  fetchItemAction: itemActions.fetchItem
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)

Item.propTypes = {
  error: PropTypes.object,
  fetchItemAction: PropTypes.func,
  item: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object,
  model: PropTypes.string,
  staticContext: PropTypes.object
}
