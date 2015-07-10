(function() {
  'use strict';

  var   _          = require('lodash'),
        util       = require('util'),
       request     = require('request'),
       parseString = require('xml2js').parseString;

  var horoscopeController = {
      getHoroScope: _getHoroScope,
      requestApi   : _requestApi,
      dailyUrl  : 'http://www.findyourfate.com/rss/dailyhoroscope-feed.asp',
      weeklyUrl : 'http://www.findyourfate.com/rss/weekly-horoscope.asp',
      monthlyUrl: 'http://www.findyourfate.com/rss/monthly-horoscope.asp',
      yearlyUrl : 'http://www.findyourfate.com/rss/yearly-horoscope.asp'
  }

  function _getHoroScope(type, sign, cb) {
    var baseUrl = _getUrlByType(type);
    var url = util.format('%s?sign=%s', baseUrl, sign);
    horoscopeController.requestApi(url, '', cb);
  }

  function _getUrlByType(type) {
    if (type == 'daily') {
      return horoscopeController.dailyUrl;
    }

    if (type == 'weekly') {
      return horoscopeController.weeklyUrl;
    }

    if (type == 'monthly') {
      return horoscopeController.monthlyUrl;
    }

    if (type == 'yearly') {
      return horoscopeController.yearlyUrl;
    }

    return horoscopeController.dailyUrl; // default to daily
  }

  function _requestApi(url, nameOfProperty, cb) {

      request({
          method: 'GET',
          url: url
      }, function(err, response, body) {
          parseString(body, function (err, result) {
              cb(err, result, response.statusCode);
          });

      });

  }

  module.exports = horoscopeController;

})();
