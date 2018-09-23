import Event from './schema'
var express = require('express')
var events = express.Router()

events.route('/')
  .get((req, res) => {
    Event.find(req.query).sort({ title: 'desc' }).exec(
      function (err, data) {
        if (err) {
          res.send(err)
        }
        res.json(data)
      }
    )
  })

events.route('/:slug')
  .get((req, res) => {
    Event.findOne({ slug: req.params.slug }, (err, data) => {
      if (err) {
        return res.status(400).send(err)
      }
      res.json(data)
    })
  })

module.exports = events
