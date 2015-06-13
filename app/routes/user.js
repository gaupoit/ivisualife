(function() {

    'use strict';

    var User     = require('../models/user'),
        utils    = require('../helpers/modelHelper'),
        moment   = require('moment');

    var userController = {
        getUsers : _getUsers,
        getUser: _getUser,
        createUser: _createUser,
    }

    function _getUsers(req, res) {

        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });

    }

    function _getUser(req, res) {

        User.findById(req.params.userId, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });

    }

    function _createUser(req, res) {

        var user = new User();

        utils.convertBodyToModel(User ,user, req.body);

        user.bod = moment(req.body.bod);
        var day = user.bod.getDay();

        user.bod_dateOfWeek = moment.weekdays(day);

        user.save(function(err, user) {

            if (err)
                res.send(err);

            res.json(user);

        });


    }

    module.exports = userController;

})();
