process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Listings = require('../models/ListingsModel').Listings;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Listings', () => {

  describe('/GET listings', () => {
      it('it should GET all the listings', (done) => {

        chai.request(server)
            .get('/api/listings')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      }).timeout(15000);
  });

  describe('/POST listings', () => {
      it('it should not POST a listing without city field', (done) => {
          let listing = {
              prodId: "123",
              category: "Lights",
              owner: 'Mary',
              price: 45,
              weeklyDiscount:4,
              zipCode: '56987',
              address: '546 Dubai Road',
              modifiedDate: '02/02/2019',
              status: 'Available'
          }
        chai.request(server)
            .post('/api/listings')
            .send(listing)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('city');
                  res.body.errors.city.should.have.property('kind').eql('required');
              done();
            });
      });

      it('it should POST a listing ', (done) => {
         let listing = {
            prodId: "123",
            category: "Lights",
            owner: 'Joan',
            price: 34,
            weeklyDiscount:4,
            zipCode: '56987',
            city: 'Istanbul',
            address: '546 Dubai Road',
            modifiedDate: '02/02/2019',
            status: 'Available'
         }
           chai.request(server)
           .post('/api/listings')
           .send(listing)
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('message').eql('listing successfully added!');
                 res.body.listing.should.have.property('_id');
                 res.body.listing.should.have.property('prodId');
                 res.body.listing.should.have.property('category');
                 res.body.listing.should.have.property('owner');
                 res.body.listing.should.have.property('price');
                 res.body.listing.should.have.property('weeklyDiscount');
                 res.body.listing.should.have.property('zipCode');
                 res.body.listing.should.have.property('city');
                 res.body.listing.should.have.property('address');
                 res.body.listing.should.have.property('modifiedDate');
                 res.body.listing.should.have.property('status');
             done();
           });

     });


   }); //end of describe

   describe('/GET/:id listing', () => {
   it('it should GET a listing by the given id', (done) => {
       let listing = new Listings({ prodId: "456", category: 'speakers', owner:'Paul', price: 70, weeklyDiscount:5, zipCode: '89765', city: 'Pune', address: '789 Long Road', modifiedDate: '3/11/19',status: 'ready' });
       //let listing = { prodId: "456", category: 'speakers', owner:'Paul', price: 70, weeklyDiscount:5, zipCode: '89765', city: 'Pune', address: '789 Long Road', modifiedDate: '3/11/19',status: 'ready' };
       listing.save((err, listing) => {

           chai.request(server)
         .get('/api/listings/id/' + listing.id)
         .send(listing)
         .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body[0].should.have.property('prodId');
               res.body[0].should.have.property('category');
               res.body[0].should.have.property('owner');
               res.body[0].should.have.property('price');
               res.body[0].should.have.property('owner');
               res.body[0].should.have.property('weeklyDiscount');
               res.body[0].should.have.property('zipCode');
               res.body[0].should.have.property('city');
               res.body[0].should.have.property('address');
               res.body[0].should.have.property('modifiedDate');
               res.body[0].should.have.property('status');
               res.body[0].should.have.property('_id').eql(listing.id);
           done();
         });
       });

   });

  });

  describe('/DELETE/:id listing', () => {
      it('it should DELETE a listing given the id', (done) => {
          let listing = new Listings({ prodId: "456", category: 'Light', owner:'Adam', price: 67, weeklyDiscount:5, zipCode: '78654', city: 'Accra', address: '345 River Road', modifiedDate: '3/11/19',status: 'ready' });
          listing.save((err, listing) => {
                chai.request(server)
                .delete('/api/listings/deleteId/' + listing.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('listing successfully deleted!');

                  done();
                });
          });
      });
  });

  describe('/PUT/:id listing', () => {
      it('it should UPDATE a listing given the id', (done) => {
          let listing = new Listings({ prodId: "456", category: 'speakers', owner:'Hanna', price: 67, weeklyDiscount:5, zipCode: '78654', city: 'tema', address: '345 South Road', modifiedDate: '3/11/19',status: 'ready' });
          listing.save((err, listing) => {
                chai.request(server)
                .put('/api/listings/update/' + listing.id)
                .send({category: 'lights', owner:'Fred', price: 100, weeklyDiscount:5})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('listing successfully updated!');
                      res.body.listing.should.have.property('price').eql(100);
                  done();
                });
          });
      });
  });

});
