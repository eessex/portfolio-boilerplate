import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

export const ItemTeaser = props => {
  const { slug, title } = props.item

  return (
    <Link to={{ pathname: `/events/${slug}` }}>{title}</Link>
  )
}

ItemTeaser.propTypes = {
  item: PropTypes.object
}
