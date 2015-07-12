var request = require('supertest');
var should = require("chai").should();

describe('Routing', function(){
  var url = 'http://localhost:8082';

  describe('GET /api/horoscope/daily/Aries', function() {
    it('respond with json and have description', function(done) {

      // once we have specified the info we want to send to the server via POST verb,
      // we need to actually perform the action on the resource, in this case we want to
      // POST on /api/profiles and we want to send some info
      // We do this using the request object, requiring supertest!
      request(url)
    	.get('/api/horoscope/daily/Aries')
      .expect('Content-Type', /json/)
		  .expect(200) //Status code
        // end handles the response
    	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.body.rss.channel[0].item[0].description[0].length.should.be.above(0);
            done();
        });
    });
  });

  describe('GET /api/horoscope/weekly/Aries', function() {
    it('respond with json and have description', function(done) {

      // once we have specified the info we want to send to the server via POST verb,
      // we need to actually perform the action on the resource, in this case we want to
      // POST on /api/profiles and we want to send some info
      // We do this using the request object, requiring supertest!
      request(url)
    	.get('/api/horoscope/weekly/Aries')
      .expect('Content-Type', /json/)
		  .expect(200) //Status code
        // end handles the response
    	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.body.rss.channel[0].item[0].description[0].length.should.be.above(0);
            done();
        });
    });
  })

});
