var express = require("express")
var router = express.Router()
var listing = require("../services/ListingService")

router.get('/listings', async (req,res) => { //passed

  var listings = await listing.getAllListings()
  res.send(listings)

})

router.get('/listings/id/:_id', async (req, res) => {  //passed
  var listings = await listing.getListingsById(req.params._id)
  res.send(listings)

})

router.get('/listings/zipCode/:zipCode', async (req, res) => {
  var listings = await listing.getListingsByZipcode(req.params.zipCode)
  res.send(listings)
})

router.get('/listings/user/:userId', async (req, res) => {
  var listings = await listing.getListingByUserId(req.params.userId)
  res.send(listings)
})

router.get('/listings/category/:category', async (req, res) => {
  var listings = await listing.getListingsByProductCategory(req.params.category)
  res.send(listings)
})

router.post('/listings', async (req,res) => {

  var listings = await listing.createListing(req.body)
  res.send(listings)

})

router.delete('/listings/deleteId/:_id', async (req,res) => {

  var listings = await listing.deleteListing(req.params._id)
  res.send(listings)

})

router.get('/listings/city/:city', async (req,res) => {
  var listings = await listing.getListingsByCity(req.params.city)
  res.send(listings)
})

router.put('/listings/update/:_id', async (req,res) => {

  var  listings = await listing.updateListing(req.params._id, req.body)
  res.send(listings)

})

router.get('/listings/date/:date', async (req, res) => {
  getListingsByDate(date)
})


module.exports = router
