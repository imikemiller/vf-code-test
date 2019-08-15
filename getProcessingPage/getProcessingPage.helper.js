const lookups = require('./getProcessingPage.lookups');
const constants = lookups.constants;
const titles = lookups.titles;
const messages = lookups.messages;

/**
 * The core method to control the StateMachine and call the transitions
 * @param {Array} data
 */
function getProcessingPage(data) {

    //Instantiate a new state machine
    let machine = new StateMachine();

    //container for promises
    let promises = [];

    //for each datum in data perform a transition
    data.forEach(datum => {
        let transition = machine.transitionState(datum.state);
        promises.push(transition(datum))
    });

    /**
     * Based on the assumption that all chains will end in
     * an error or success output object we can return 
     * the last object from the result of the promises
     */
    return Promise.all(promises).then(function (results) {
        return results.slice(-1).pop();
    });
};

/**
 * Initialise transition - no work to do
 */
function initialise() {
    return null;
}

/**
 * Process transition - takes 2 seconds to process
 */
function process() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(null);
        }, 2000);
    });
}

/**
 * Error transition - returns the error output
 * 
 * @param {Object} datum
 */
function error(datum) {
    return output(titles[constants.STATE_ERROR], messages[datum.errorCode])
}

/**
 * Success transition - returns the success output
 */
function success() {
    return output(titles[constants.STATE_SUCCESS])
}

/**
 * Output utility - generates an output object
 */
function output(title, message = null) {
    return { title, message }
}

/**
 * StateMachine
 * 
 * The purpose of this StateMachine is to keep track of the current state,
 * to contain a mapping between a state and a transition function and to
 * contain the allowed transition paths between states.
 * 
 * It exposes the method `transitionState` which is responsible for
 * finding a transition path, setting the new value for current 
 * state and for returning the transition function.
 */
function StateMachine() {
    //The default initial state
    this.currentState = constants.STATE_INIT;

    //Map of state to transition functions
    this.stateTransitions = {
        [constants.STATE_INIT]: initialise,
        [constants.STATE_PROCESSING]: process,
        [constants.STATE_ERROR]: error,
        [constants.STATE_SUCCESS]: success
    }

    //Allowed transition paths
    this.allowedTransitions = [
        [constants.STATE_INIT, constants.STATE_PROCESSING],
        [constants.STATE_PROCESSING, constants.STATE_PROCESSING],
        [constants.STATE_PROCESSING, constants.STATE_SUCCESS],
        [constants.STATE_PROCESSING, constants.STATE_ERROR],
    ]

    /**
     * Manages the transition between the current state 
     * to the new state in the chain contained in data
     */
    this.transitionState = (newState) => {

        //find the associated transition
        let transition = this.stateTransitions[newState];
        if (!transition) throw new Error(`No transition to this state: ${newState}`)

        //set state
        let destinationState = this.findAllowedTransition(newState);
        this.currentState = destinationState[1];

        //return transition
        return transition;
    }

    /**
     * Determine which of the allowed transition paths applies
     * to the current state + destination state
     */
    this.findAllowedTransition = function (newState) {
        //find any paths that start at the current state
        let allowedTransitions = this.allowedTransitions.filter((trans) => {
            return trans[0] === this.currentState;
        });

        if (!allowedTransitions.length) throw new Error(`No allowed transitions from this state: ${this.currentState}`);

        //find the path that finishes at the new destination state
        let allowedTransition = allowedTransitions.find((trans) => {
            return trans[1] === newState;
        });

        if (!allowedTransition) throw new Error(`No destination state: ${this.currentState} -> ${newState}`);

        return allowedTransition;
    }
}


module.exports = {
    getProcessingPage,
    initialise,
    process,
    error,
    success,
    output,
    StateMachine
}