const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: String,
  address: String,
  lat: String,
  lng: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
