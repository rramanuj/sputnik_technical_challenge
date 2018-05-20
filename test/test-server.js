// =======================
// test dependencies =====
// =======================*/
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

// =======================
// test urls  ============
// =======================*/
let badLink = 'The URL you provided does not lead anywhere :(.'
let unformattedLink = 'URL must in following format: http://www.example.co.uk'

let secureUrl = {
    'url': 'https://www.google.co.uk'
}
let unsecureUrl = {
    'url': 'http://www.google.co.uk'
}
let unformattedUrl = {
    'url': 'www.google.co.uk'
}
let badUrl = {
    'url': 'http://localhost:1200/'
}
//random website that uses google analytics
let googleAnalyticsUrl = {
    'url': 'https://www.branded3.com/blog/track-internal-site-search-using-google-tag-manager/'
}

// =======================
// scrape tests  =========
// =======================*/
//returns links, unique domains and website security
describe('scrape', function () {
    it('should list number of links on the page that the user can click on & unique domains', function (done) {
        chai.request(server)
            .post('/api/scrape')
            .send(secureUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.links).to.satisfy(Number.isInteger);
                expect(res.body.domains).to.satisfy(Number.isInteger);
                expect(res.body.secure).to.eql(true);
                res.should.have.status(200);
                done();
            });
    });

    it('success but link is not secure (http)', function (done) {
        chai.request(server)
            .post('/api/scrape')
            .send(unsecureUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.links).to.satisfy(Number.isInteger);
                expect(res.body.domains).to.satisfy(Number.isInteger);
                expect(res.body.secure).to.eql(false);
                res.should.have.status(200);
                done();
            });

    });
    it('should return message saying unformatted url', function (done) {
        chai.request(server)
            .post('/api/scrape')
            .send(unformattedUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.links).to.eql(unformattedLink);
                expect(res.body.domains).to.eql(unformattedLink);
                expect(res.body.secure).to.eql(unformattedLink);
                res.should.have.status(400);
                done();
            });
    });

    it('should return message saying link leads nowhere', function (done) {
        chai.request(server)
            .post('/api/scrape')
            .send(badUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.links).to.eql(badLink);
                expect(res.body.domains).to.eql(badLink);
                expect(res.body.secure).to.eql(badLink);
                res.should.have.status(404);
                done();
            });
    });
});
// =======================
// title tests ===========
// =======================*/
describe('title', function () {
    it('should display the page title', function (done) {
        chai.request(server)
            .post('/api/title')
            .send(secureUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.title).to.be.a('string');
                res.should.have.status(200);
                done();
            });
    });
    it('should return message saying unformatted url', function (done) {
        chai.request(server)
            .post('/api/title')
            .send(unformattedUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.title).to.eql(unformattedLink);
                res.should.have.status(400);
                done();
            });
    });

    it('should return message saying link leads nowhere', function (done) {
        chai.request(server)
            .post('/api/title')
            .send(badUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.title).to.eql(badLink);
                res.should.have.status(404);
                done();
            });
    });
});
// =======================
// GA Tests  =============
// =======================*/
//uses gtmd to figure out whether a page has GA on it. Scrapes page header for a tag

describe('google analytics', function () {
    it('should return "true" (indicating it uses GA)', function (done) {
        chai.request(server)
            .post('/api/analytics')
            .send(googleAnalyticsUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.result).to.eql(true);
                res.should.have.status(200);
                done();
            });
    });
    it('should return false (indicating it doesnt use GA)', function (done) {
        chai.request(server)
            .post('/api/analytics')
            .send(secureUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.result).to.eql(false);
                res.should.have.status(200);
                done();
            });
    });
    it('should return message saying unformatted url', function (done) {
        chai.request(server)
            .post('/api/analytics')
            .send(unformattedUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.result).to.eql(unformattedLink);
                res.should.have.status(400);
                done();
            });
    });

    it('should return message saying link leads nowhere', function (done) {
        chai.request(server)
            .post('/api/analytics')
            .send(badUrl)
            .end(function (err, res) {
                res.should.be.json;
                expect(res.body.result).to.eql(badLink);
                res.should.have.status(404);
                done();
            });
    });
});
