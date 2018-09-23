var express = require('express')
var settings = express.Router()

const settingsData = {
  navigation: [
    {
      events: true,
      title: 'Events',
      slug: 'events'
    }
  ]
}

settings.route('/')
  .get((req, res) => {
    res.json(settingsData)
  })

module.exports = settings
