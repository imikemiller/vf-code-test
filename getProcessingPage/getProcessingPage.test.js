const assert = require('assert');
const getProcessingPage = require('./getProcessingPage.helper');

const testCases = [
    {
        testCase: [{ state: 'processing' }, { state: 'error' }],
        expectedResult: { title: 'Error page', message: null }
    },
    {
        testCase: [{ state: 'processing' }, { state: 'error' }],
        expectedResult: { title: 'Error page', message: null }
    },
]

describe('getProcessingPage', function () {
    testCases.forEach(function (t, k) {
        describe(`case ${k}`, function () {
            it(`should return the result: ${JSON.stringify(t.expectedResult)}`, function () {
                let result = getProcessingPage(t.testCase);
                assert.equal(result, t.expectedResult)
            })
        })
    })
});