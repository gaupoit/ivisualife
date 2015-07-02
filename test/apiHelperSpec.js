var 
	assert = require("chai").assert,
	should = require("chai").should(),
	apiHelper = require("../app/helpers/apiHelper");

describe("apiHelper", function() {
	describe("#constructor", function() {
		it('should have the world bank url which is http://api.worldbank.org/countries', function() {
			apiHelper.worldbankUrl.should.be.equal('http://api.worldbank.org/countries');
		});
	});
});
	
 