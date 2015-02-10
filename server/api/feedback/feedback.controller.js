'use strict';

var _ = require('lodash');
var Feedback = require('./feedback.model');
var fs = require('fs');

// Get list of feedbacks
exports.index = function (req, res) {
    Feedback.find(function (err, feedbacks) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, feedbacks);
    });
};

// Get a single feedback
exports.show = function (req, res) {
    var options = {};
    switch (req.query.resultType) {
        case "short":
            options = {auto_number: true, rating: true};
            break;
        case "long":
            options = {_id: false};
    }
    Feedback.find({"auto_number": {$regex: req.params.q, $options: "i"}}, options, function (err, feedback) {
        if (err) {
            return handleError(res, err);
        }
        if (!feedback) {
            return res.send(404);
        }
        return res.json(feedback);
    });
};

// Creates a new feedback in the DB.
exports.create = function (req, res) {
    //todo : the commented code is useful in the case of multi-part file upload.
    /*fs.writeFile('image1.png', req.files.driver_photo.buffer, function (err) {
     if (err) {
     console.log("error in writing file")
     }
     });*/
    Feedback.create(req.body.data, function (err, feedback) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, feedback);
    });
};

// Updates an existing feedback in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Feedback.findById(req.params.id, function (err, feedback) {
        if (err) {
            return handleError(res, err);
        }
        if (!feedback) {
            return res.send(404);
        }
        var updated = _.merge(feedback, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, feedback);
        });
    });
};

// Deletes a feedback from the DB.
exports.destroy = function (req, res) {
    Feedback.findById(req.params.id, function (err, feedback) {
        if (err) {
            return handleError(res, err);
        }
        if (!feedback) {
            return res.send(404);
        }
        feedback.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

var handleError = function (res, err) {
    return res.send(500, err);
};

var calculateRating = function (feedback) {

};