// =======================
// get packages  =========
// =======================
var express = require('express');
var request = require('request');
var URL = require('url');
var cheerio = require('cheerio');
var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var gtmd = require('google-tag-manager-detection');

// =======================
// globals  ==============
// =======================
let badLink = 'The URL you provided does not lead anywhere :(.';
let unformattedLink = 'URL must in following format: http://www.example.co.uk';
const urlController = {}; //establish instance for export


// =======================
// functions  ============
// =======================

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
    var url = req.body.url
    //ensure url is in the correct format
    if (ValidURL(url)) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //if we can fire a request to the url in question, it means the link is valid
                gtmd.checkUrlForGaViaGtm(url, function (result) {
                    //if the link contains google analytics
                    if (result.has_ga) {
                        res.json({
                            "result": result.has_ga
                            //return bool value of true
                        })
                    }
                    else {
                        res.json({ "result": false })
                    }
                })
            } else {
                //if we don't get 200 response from the link, they've wrote something dodgy
                res.status(404).json({
                    "result": badLink
                });
            }
        })
    }
    else {
        res.status(400).json({
            "result": unformattedLink
        });
    }
}

//get title
urlController.title = function (req, res) {
    //  var url =  req.protocol + '://' + req.get('host') + req.originalUrl;
    var url = req.body.url;
    //ensure url is in the correct format
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
                res.status(404).json({
                    "title": badLink
                });
            }
        })
    } else {
        res.status(400).json({
            "title": unformattedLink
        });
    }
}

// get links/unique domains
urlController.scrape = function (req, res) {
    //url redirect
    var hyperlinks = [];
    var domains = [];
    var url = req.body.url;
    var secured = false;

    if (ValidURL(url)) {
        if (url.indexOf("https") == 0) {
            secured = true;
        }
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
                res.status(404).json({
                    "links": badLink,
                    "domains": badLink,
                    "secure": badLink
                });
            }
        })
    } else {
        res.status(400).json({
            "links": unformattedLink,
            "domains": unformattedLink,
            "secure": unformattedLink
        });
    }
};

module.exports = urlController;