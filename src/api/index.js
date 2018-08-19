var express = require('express')
var api = express.Router()

api.use('/events', require('./events'))
api.use('/settings', require('./settings'))

module.exports = api
