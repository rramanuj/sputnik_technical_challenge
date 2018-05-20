'use strict';
var express = require('express');

// get an instance of the router for api routes
var router = express.Router();
//A router instance is a middleware and routing system; a mini app.

//Controller Imports
var urlController = require('./controllers/urlController')

// =======================
// routes ================
// =======================

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the Webscrape API!' });
});

//RESTful routes (or atleast a foundation for future restful routes)
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
