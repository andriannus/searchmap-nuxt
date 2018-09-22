const mongoose = require('mongoose');

const { Schema } = mongoose;

const shapeSchema = new Schema({
  name: String,
  type: String,
  coordinate: String,
  date: {
    type: Date,
    default: Date.new,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Shape = mongoose.model('Shape', shapeSchema);
module.exports = Shape;
