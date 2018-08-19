import PropTypes from 'prop-types'
import React from 'react'

export const ItemPage = props => {
  const { title } = props.item

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

ItemPage.propTypes = {
  item: PropTypes.object
}
