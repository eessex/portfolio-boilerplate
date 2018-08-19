import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

export const ItemTeaser = props => {
  const { id, title } = props.item

  return (
    <Link to={{ pathname: `/events/${id}` }}>{title}</Link>
  )
}

ItemTeaser.propTypes = {
  item: PropTypes.object
}
