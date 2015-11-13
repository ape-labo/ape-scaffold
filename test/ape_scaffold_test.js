/**
 * Test case for apeScaffold.
 * Runs with mocha.
 */

const apeScaffold = require('../lib/ape_scaffold.js'),
    assert = require('assert');

const tmpDir = __dirname + '/../tmp';

describe('ape-scaffold', ()=> {
    before((done)=> {
        done();
    });
    after((done) => {
        done();
    });

    it('Apply scaffold', (done) => {
        apeScaffold(tmpDir + '/foo/bar', {
            straight: true,
            force: true
        }, (err)=> {
            assert.ifError(err);
            done();
        });
    });
});


