var express = require('express')
var events = express.Router()

const eventData = [
  {
    id: 1,
    slug: 'first-event',
    title: 'First Event'
  }, {
    id: 2,
    slug: 'second-event',
    title: 'Second Event'
  }
]

events.route('/')
  .get((req, res) => {
    res.json(eventData)
  })

  events.route('/:id')
  .get((req, res) => {
    const event = eventData[req.params.id - 1]
    if (event) {
      res.json(event)
    } else {
      res.send({ error: 'not found' })
    }
  })

module.exports = events
