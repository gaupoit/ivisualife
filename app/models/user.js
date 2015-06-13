var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({

    name: { type: String, required: true },
    country: String,
    bod: Date,
    bod_dateOfWeek : String,
    sex: String,
    created_at: Date,
    updated_at: Date

});

UserSchema.pre('save', function(next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at) {

        this.created_at = currentDate;

    }

    next();
});


module.exports = mongoose.model('User', UserSchema);
