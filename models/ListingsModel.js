var mongoose = require('mongoose')


var schema = new mongoose.Schema({
  prodId: String,
  category: { type: String, lowercase: true, required: true },
  owner: { type: String, lowercase: true, required: true },
  price: {type: Number, required: true},
  weeklyDiscount: {type: Number, required: true},
  zipCode: {type: Number, required: true},
  city: { type: String, lowercase: true, required: true },
  address: { type: String, lowercase: true, required: true },
  modifiedDate: Date,
  status: { type: String, lowercase: true, required: true }


});
var Listings = mongoose.model('Listings',schema)

module.exports = {
  Listings : Listings
}
