import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)

const EventSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    slug: ['title'],
    slug_padding_size: 2,
    unique: true
  }
})

module.exports = mongoose.model('Event', EventSchema)
