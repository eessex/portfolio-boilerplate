import PropTypes from 'prop-types'
import React from 'react'
import { ItemTeaser } from 'client/Components/Item/ItemTeaser'

export const ItemsList = props => {
  const { items } = props

  return (
    <ul>
      {items.map(item => (
        <li key={item.slug}>
          <ItemTeaser item={item} />
        </li>
      ))
      }
    </ul>
  )
}

ItemsList.propTypes = {
  items: PropTypes.array
}
