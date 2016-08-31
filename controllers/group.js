var Group = require('../models/indiana');

exports.xxx = function(args, fn){
    Group.questionList(args, function(err, result) {
        fn(err, result);
    });
};






