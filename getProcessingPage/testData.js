const lookups = require('./getProcessingPage.lookups');
const constants = lookups.constants;
const titles = lookups.titles;
const messages = lookups.messages;

module.exports = [
    //error cases
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR }],
        expectedResult: { title: lookups.titles[constants.STATE_ERROR], message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: constants.ERROR_NO_STOCK }],
        expectedResult: { title: titles[constants.STATE_ERROR], message: messages[constants.ERROR_NO_STOCK] }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: constants.ERROR_INCORRECT_DETAILS }],
        expectedResult: { title: titles[constants.STATE_ERROR], message: messages[constants.ERROR_INCORRECT_DETAILS] }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: null }],
        expectedResult: { title: titles[constants.STATE_ERROR], message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: undefined }],
        expectedResult: { title: titles[constants.STATE_ERROR], message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_ERROR, errorCode: undefined }],
        expectedResult: { title: titles[constants.STATE_ERROR], message: null }
    },
    //success cases
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS }],
        expectedResult: { title: titles[constants.STATE_SUCCESS], message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS, errorCode: null }],
        expectedResult: { title: titles[constants.STATE_SUCCESS], message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS, errorCode: undefined }],
        expectedResult: { title: titles[constants.STATE_SUCCESS], message: null }
    },
    {
        testCase: [{ state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_PROCESSING }, { state: constants.STATE_SUCCESS, errorCode: undefined }],
        expectedResult: { title: titles[constants.STATE_SUCCESS], message: null }
    },
]