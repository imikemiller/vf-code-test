const assert = require('assert');
const expect = require('chai').expect;
const helper = require('./getProcessingPage.helper');
const getProcessingPage = helper.getProcessingPage;
const lookups = require('./getProcessingPage.lookups');
const constants = lookups.constants;
const titles = lookups.titles;
const messages = lookups.messages;

const testCases = require('./testData');

describe('getProcessingPage', function () {
    /**
     * Proofs of the function performing as expected
     */
    testCases.forEach(function (t, k) {
        describe(`case ${k} @proofs`, function () {
            it(`${JSON.stringify(t.testCase)} -> should return the result -> ${JSON.stringify(t.expectedResult)}`, function () {
                //start the run
                let start = new Date;
                //run the helper
                return getProcessingPage(t.testCase).then(function (result) {
                    //capture the finish time
                    let finish = new Date;
                    //the duration (finish-start) should be at least as much as the delay
                    expect(finish - start).to.be.at.least(2000);
                    //compare result with the expected
                    expect(result).to.deep.equal(t.expectedResult)
                });
            })
        })
    });

    /**
     *Test the transition functions
     */
    describe('transitions', function () {
        it('initialise should return null', function () {
            expect(helper.initialise()).to.be.null;
        })
        it('process should return a Promise that resolves after 2 seconds', function () {
            //start the run
            let start = new Date;
            return helper.process().then(result => {
                //capture the finish time
                let finish = new Date;
                //the duraction (finish-start) should be at least as much as the delay
                let duration = finish - start;
                expect(duration).to.be.at.least(2000);
                expect(result).to.be.null;
            })
        })
        it('success should return a function', function () {
            expect(helper.success()).to.deep.equal({ title: titles[constants.STATE_SUCCESS], message: null })
        })
        it('error should return a function', function () {
            expect(helper.error({ state: constants.STATE_ERROR, errorCode: constants.ERROR_NO_STOCK })).to.deep.equal({ title: titles[constants.STATE_ERROR], message: messages[constants.ERROR_NO_STOCK] })
        })
        it('output should return a JSON', function () {
            expect(helper.output('voda', 'fone')).to.deep.equal({ title: 'voda', message: 'fone' })
        })
    })

    /**
     * Test method of the StateMachine class
     */
    describe('StateMachine', function () {
        let machine = new helper.StateMachine();

        it('Should find the correct destination state from init', function () {
            expect(machine.currentState).to.be.equal(constants.STATE_INIT)
            expect(machine.findAllowedTransition(constants.STATE_PROCESSING)[1]).to.be.equal(constants.STATE_PROCESSING);
            expect(() => machine.findAllowedTransition(constants.STATE_ERROR)[1]).to.throw('No destination state');
        });

        it('Should find the correct destination state from processing', function () {
            machine.currentState = constants.STATE_PROCESSING;
            expect(machine.findAllowedTransition(constants.STATE_PROCESSING)[1]).to.be.equal(constants.STATE_PROCESSING);
            expect(machine.findAllowedTransition(constants.STATE_ERROR)[1]).to.be.equal(constants.STATE_ERROR);
            expect(machine.findAllowedTransition(constants.STATE_SUCCESS)[1]).to.be.equal(constants.STATE_SUCCESS);
            expect(() => machine.findAllowedTransition(constants.STATE_INIT)[1]).to.throw('No destination state');
        });
    })

});