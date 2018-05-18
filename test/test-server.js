var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

//get links
describe('scrape', function() {
    it('should display the page title') , function(done){
        chai.request(server)
        .get('/api/scrape/www.google.co.uk')
        .end(function(err, res){
          res.should.be.json;
          res.body.length.should.be.eql(0);
          res.should.have.status(200);
          done();
        });
    },
    it('should list number of links on the page that the user can click on & unique domains', function(done) {
        chai.request(server)
          .get('/api/scrape/www.google.co.uk')
          .end(function(err, res){
            res.should.be.json;
            res.body.length.should.be.eql(0);
            res.should.have.status(200);
            done();
          });
      });

  it('Whether the page was served in a secure manner<id> PUT');
  it('Was Google Analytics available and working on the page?');
});

/*
  * Test the /POST route

 describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
      let book = {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          year: 1954
      }
      chai.request(server)
          .post('/book')
          .send(book)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('pages');
              res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});
}); */
  /*
  * Test the /POST route
/*

+ The <title> of the page
+ Number of links on the page that the user can click on
+ Number of unique domains that these links go to
+ Whether the page was served in a secure manner
+ Was Google Analytics available and working on the page?

*/

/*
describe('Books', () => {
    beforeEach((done) => {
        Book.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route

 describe('/POST book', () => {
    it('it should not POST a book without pages field', (done) => {
      let book = {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          year: 1954
      }
      chai.request(server)
          .post('/book')
          .send(book)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('pages');
              res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});
}); */