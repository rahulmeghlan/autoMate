'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    auto_number: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5},
    driver_name: String,
    driver_photo: String,
    feedback: [
        {message: {type: String},
            user: {type: Schema.Types.ObjectId, ref: 'User'},
            rating: {type: Number, min: 0, max: 4, required: true}}
    ]
});

module.exports = mongoose.model('Feedback', FeedbackSchema);