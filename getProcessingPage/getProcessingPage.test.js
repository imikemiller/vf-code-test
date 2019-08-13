const assert = require('assert');
const expect = require('chai').expect;
const getProcessingPage = require('./getProcessingPage.helper');
const lookups = require('./getProcessingPage.lookups');
const constants = lookups.constants;
const titles = lookups.titles;
const messages = lookups.messages;

const testCases = [
    //error cases
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR }],
        expectedResult: { title: lookups.titles.error, message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: constants.ERROR_NO_STOCK }],
        expectedResult: { title: titles.error, message: messages.NO_STOCK }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: constants.ERROR_INCORRECT_DETAILS }],
        expectedResult: { title: titles.error, message: messages.INCORRECT_DETAILS }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: null }],
        expectedResult: { title: titles.error, message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: undefined }],
        expectedResult: { title: titles.error, message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: undefined }],
        expectedResult: { title: titles.error, message: null }
    },
    //success cases
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS }],
        expectedResult: { title: titles.success, message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS, errorCode: null }],
        expectedResult: { title: titles.success, message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS, errorCode: undefined }],
        expectedResult: { title: titles.success, message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS, errorCode: undefined }],
        expectedResult: { title: titles.success, message: null }
    },
]

describe('getProcessingPage', function () {
    testCases.forEach(function (t, k) {
        describe(`case ${k}`, function () {
            it(`should return the result: ${JSON.stringify(t.expectedResult)}`, function () {
                let start = new Date;
                let delay = t.testCase.filter(c => c.state === constants.STATE_PROCESSING).length * 2 //seconds delay
                let result = getProcessingPage(t.testCase);
                let finish = new Date;
                expect(finish - start).to.be.greaterThan(delay);
                assert.equal(result, t.expectedResult);
            })
        })
    })
});