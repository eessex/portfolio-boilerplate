var express = require('express')
var settings = express.Router()

settings.route('/')
  .get((req, res) => {
    res.json({
      navigation: [
        {
          events: true,
          title: 'Events',
          slug: 'events'
        }
      ]
    })
  })

module.exports = settings
