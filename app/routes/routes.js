'use strict';

var user    = require('./user'),
    population = require('./population'),
    horoscope = require('./horoscope'),
    env           =  "",
    express      = require('express'),
    path         = require('path');
module.exports = function(app) {

  env = app.get('env');


  app.get( '/api/users',                        user.getUsers);
  app.get( '/api/users/:userId',                user.getUser);
  app.post( '/api/users',                       user.createUser);


  app.get('/api/population/:year', function(req, res, next) {

        var year = req.params.year;

        population.getPopulation(year, function(error, data, statusCode) {

            _returnJson(error, data[1][0].value, res, statusCode);

        });

  });

  app.get('/api/wp-rank/:dob/:sex/:country/today', function(req, res, next) {
    var dob = req.params.dob;
    var sex = req.params.sex;
    var country = req.params.country;

    population.getPopulationRankToday(dob, sex, country, function(error, data, statusCode) {
      // _returnJson(error, Number(data.rank), res, statusCode);
      _returnJson(error, data, res, statusCode);
    });

  });

  app.get('/api/life_expectancy/:country/:year/:gender', function(req, res, next) {

        var country = req.params.country;
        var year = req.params.year;
        var gender = req.params.gender;

        population.getLifeExpectancy(country, year, gender, function(error, data, statusCode) {

            _returnJson(error, Number(data[1][0].value), res, statusCode);

        });

  });

  app.get('/api/horoscope/:typex/:sign', function(req, res, next) {
    var type = req.params.typex;
    var sign = req.params.sign;
    horoscope.getHoroScope(type, sign, function(error, data, statusCode) {
      _returnJson(error, data, res, statusCode);
    });
  });

  app.get('/test', function(req, res, next) {
    res.send(200, 'Hello222ssssaaaaaaxxxx');
  });

  function _returnJson(error, result, res, statusCode) {

        if (error != null) {

            res.status(statusCode).json(error);

        } else {

            res.status(statusCode).json(result);

        }

    }
}

//=============== Handling error callback method
// resources not found
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

// development error handler will print stacktrace
function developmentHandleError(err, req, res, next) {
    if (env === 'development') {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    } else {
        next(err);
    }
}

// production error handler no stacktraces leaked to user
function productionHandleError(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
};
