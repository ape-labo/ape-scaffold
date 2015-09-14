/**
 * Test case for apeScaffold.
 * Runs with nodeunit.
 */

var apeScaffold = require('../lib/ape_scaffold.js');

var tmpDir = __dirname + '/../tmp';

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Ape scaffold'] = function (test) {
    apeScaffold(tmpDir + '/foo/bar', {
        straight: true
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};

