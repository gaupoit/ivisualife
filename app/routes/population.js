'use strict';

var moment = require('moment'),
    util = require('util'),
    _ = require('lodash'),
    request = require('request')
    apiHelper = require('../helpers/apiHelper');

var populationController = {
    getPopulation: _getPopulation,
    getLifeExpectancy: _getLifeExpectancy,
    requestApi: _requestApi,
    baseUrl: apiHelper.worldbankUrl
}

function _getPopulation(year, cb) {
    year = _formatYear(year);
    var url = util.format('%s/wld/indicators/SP.POP.TOTL?date=%s&format=json', populationController.baseUrl, year);
    populationController.requestApi(url, '', cb);
}

function _formatYear(year) {
    var now = moment();
    var currentYear = now.year();
    var maxYear = currentYear - 1;
    if (year > maxYear) {
        year = maxYear;
    }
    return year;
}

function _formatGender(gender) {
    var MALE = "MALE";
    var FEMALE = "FEMALE";
    var GENDER = gender.toUpperCase();
    if (MALE == GENDER) {
        gender = "MA";
    } else if (FEMALE == GENDER) {
        gender = "FE";
    }
    return gender;
}

function _getLifeExpectancy(country, year, gender, cb) {
    year = _formatYear(year);
    gender = _formatGender(gender);
    var url = util.format('%s/%s/indicators/SP.DYN.LE00.%s.IN?date=%s&format=json', populationController.baseUrl, country, gender, year);
    populationController.requestApi(url, '', cb);
}

function _requestApi(url, nameOfProperty, cb) {
    request({
        method: 'GET',
        url: url
    }, function(err, response, body) {
        var result = JSON.parse(body);
        cb(err, result, response.statusCode);
    });
}
module.exports = populationController;