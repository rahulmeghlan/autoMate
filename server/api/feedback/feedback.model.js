'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    auto_number: {type: String, required: true},
    rating: {type: Number, required: true},
    driver_name: String,
    feedback: [
        {message: {type: String}, user: {type: Schema.Types.ObjectId, ref: 'User'}}
    ]
});

module.exports = mongoose.model('Feedback', FeedbackSchema);