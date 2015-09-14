/**
 * Test case for defaultData.
 * Runs with nodeunit.
 */

var gitUser = require('../lib/git_user.js');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Default data'] = function (test) {
    gitUser(function (err, data) {
        //console.log('data',data);
        test.ifError(err);
        test.done();
    });
};

