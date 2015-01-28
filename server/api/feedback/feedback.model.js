'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    auto_number: String,
    rating: Number,
    driver_name: String,
    feedback: []
});

module.exports = mongoose.model('Feedback', FeedbackSchema);