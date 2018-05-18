var express = require('express');
var request = require('request');
var URL = require('url');
var cookieParser = require('cookie-parser')
var cheerio = require('cheerio');
var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var gtmd = require('google-tag-manager-detection')
const urlController = {}; //establish instance for export

//function to validate a url
function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}

//uses npm library 'gtmd' to check if google analytics is running on the page
urlController.checkForGA = function (req, res) {
    //var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var url = req.body.url;

    if (ValidURL(url)) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                gtmd.checkUrlForGtm(url, function (result) {
                    res.json({
                        "result": result
                    });
                })
            } else {
                res.json({
                    "result": "The link doesn't lead anywhere :("
                });
            }
        })
    }
    else {
        res.json({
            "result": "URL must in following format: http://www.example.co.uk"
        });
    }
}

//get title
urlController.title = function (req, res) {
    //  var url =  req.protocol + '://' + req.get('host') + req.originalUrl;
    var url = req.body.url;

    if (ValidURL(url)) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(body);
                        var title = $("title").text();
                        res.json({
                            "title": title
                        })
                    }
                }
                )
            } else {
                res.json({
                    "title": "The link doesn't lead anywhere :("
                });
            }
        })
    } else {
        res.json({
            "title": "URL must in following format: http://www.example.co.uk"
        });
    }
}

// get links/domains
urlController.scrape = function (req, res) {
    //url redirect
    var hyperlinks = [];
    var domains = [];
    // var url =  req.protocol + '://' + req.get('host') + req.originalUrl;
    var url = req.body.url;
    var secured = false;

    /*if (req.connection.encrypted) {
                    secured = true;
                } */
    if (ValidURL(url)) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                request(url, function (err, resp, body) {
                    $ = cheerio.load(body);   //cheerio allows us to scrape webpages, assign the $operator to do things with
                    allLinks = $('a'); //jquery get all hyperlinks
                    $(allLinks).each(function (i, link) {
                        var l = String($(link).attr('href'));
                        //URL library extracts domain from a given link
                        var domain = URL.parse(l).host;
                        hyperlinks.push(l); //push the original hyperlink into hyperlink array

                        if (domain != null) {
                            //if domain is actually a domain, store it in the domain array
                            domains.push(domain);
                        }
                    });

                    //stick a filter on the domain array to only display unique values
                    var unique = domains.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    })

                    //ta-da
                    res.json({
                        "links": hyperlinks.length,
                        "domains": unique.length,
                        "secure": secured
                    });
                });
            } else {
                res.json({
                    "links": "The link doesn't lead anywhere :(",
                    "domains": "The link doesn't lead anywhere :(",
                    "secure": "The link doesn't lead anywhere :("
                });
            }
        })
    } else {
        res.json({
            "links": "URL must in following format: http://www.example.co.uk",
            "domains": "URL must in following format: http://www.example.co.uk",
            "secure": "URL must in following format: http://www.example.co.uk"
        });
    }
};

module.exports = urlController;