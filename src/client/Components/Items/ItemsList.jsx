import PropTypes from 'prop-types'
import React from 'react'
import { ItemTeaser } from 'client/components/Item/ItemTeaser'

export const ItemsList = props => {
  const { items } = props

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
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
