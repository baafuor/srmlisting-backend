var express = require("express")
var mongoose = require('mongoose')
var Listing = require('../models/ListingsModel').Listings



mongoose.Promise = Promise
var dbUrl = 'mongodb://user:user@test1-shard-00-00-sokyv.mongodb.net:27017,test1-shard-00-01-sokyv.mongodb.net:27017,test1-shard-00-02-sokyv.mongodb.net:27017/test?ssl=true&replicaSet=Test1-shard-0&authSource=admin&retryWrites=true'

  const getAllListings = () => {

    return Listing.find() // Notice the return here
    .exec()
    .then((listings) => {
      return listings;
    })
    .catch((err) => {
      return console.error(err)
    });

    }

    const getListingsById = (id) => {

      return Listing.find({_id: id}).exec()
      .then((listings) => {
        return listings
      })
      .catch((err) => {
        return console.error(err)
      })

    }


  const getListingsByProductName = (prodId) => {

    return Listing.find({prodId:prodId}).exec()
    .then((listings) => {
      return listings
    })
    .catch((err) => {
      return console.error(err)
    })

  }
  //
  const getListingsByZipcode = (zipCode) => {
    return Listing.find({zipCode:zipCode}).exec()
    .then((listings) => {
      return listings
    })
    .catch((err) => {
      return console.error(err)
    })
  }
  //
  const getListingsByProductCategory = (category) => {
    return Listing.find({category:category}).exec()
    .then((listings) => {
      return listings
    })
    .catch((err) => {
      return console.error(err)
    })
  }
  //
  const createListing = (body) => {

    var listing = new Listing(body)
    return listing.save()
    .then((listing) => {
        return ({message: "listing successfully added!", listing})
    }).catch((err) => {
        return err
    })
  }
  //
  const updateListing = (id, update) => {
    return Listing.findOneAndUpdate({_id: id}, update,{new: true})
    .then((listing) => {
      return ({message: "listing successfully updated!", listing})
    })
    .catch((err) => {
      return console.error(err)
    })
  }

  const deleteListing = (deleteQuery) => {
    return Listing.deleteOne({_id: deleteQuery})
    .then((deleted) => {
      return ({message: "listing successfully deleted!", deleted})
    })
    .catch((err) => {
      return console.error(err)
    })
  }


  const getListingByUserId = (id) => {
    return Listing.find({_id : id}).exec()
    .then((listings) => {
      return listings
    })
    .catch((err) => {
      return 'error occured'
    })
  }

  const getListingsByCity = (city) => {
    return Listing.find({city:city}).exec()
    .then((listings) => {
      return listings
    })
    .catch((err) => {
      return 'error occured'
    })
  }



const getListingsByDate = (date) => {
  return Listing.find({date: date}).exec()
  .then((listings) => {
    return listings
  }).catch((err) => {
    return err
  })
}

const assignUpdate = (listing, update) => {
  Object.assign(listing, update).save((err, listing) => {
    if(err) return error
    return listing

  })
}

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connection',err)
})


module.exports = {getAllListings, createListing, getListingByUserId, getListingsByZipcode, getListingsByProductName, getListingsByProductCategory, getListingsById, getListingsByCity, updateListing,deleteListing}
