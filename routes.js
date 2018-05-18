'use strict';
var express = require('express');

// get an instance of the router for api routes
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

//A router instance is a middleware and routing system; a mini app.
//Controller Imports
var urlController = require('./controllers/urlController')

// =======================
// routes ================
// =======================


//route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.route('/authenticate')
  .post(function (req, res) {
    userController.authenticate(req, res)
  });

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

router.route('/sports')
  .post(function (req, res) {
    userController.sports(req, res)
  })


// route to return all users (GET http://localhost:8080/api/users)
router.route('/users')
  .get(function (req, res) {
    userController.getAll(req, res)
  })
  .post(function (req, res) {
    userController.create(req, res)
  });

router.route('/title')
  .post(function (req, res) {
    urlController.title(req, res)
  });

router.route('/scrape')
  .post(function (req, res) {
    urlController.scrape(req, res)
  });

router.route('/analytics')
  .post(function (req, res) {
    urlController.checkForGA(req, res)
  });

module.exports = router;
