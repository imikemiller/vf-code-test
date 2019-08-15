const ERROR_NO_STOCK = 'NO_STOCK';
const ERROR_INCORRECT_DETAILS = 'INCORRECT_DETAILS';
const STATE_INIT = 'init';
const STATE_PROCESSING = 'processing';
const STATE_ERROR = 'error';
const STATE_SUCCESS = 'success';

const lookups = {
    constants: {
        ERROR_NO_STOCK, ERROR_INCORRECT_DETAILS, STATE_ERROR, STATE_PROCESSING, STATE_SUCCESS, STATE_INIT
    },
    messages: {
        [ERROR_NO_STOCK]: 'No stock has been found',
        [ERROR_INCORRECT_DETAILS]: 'Incorrect details have been entered'
    },
    titles: {
        [STATE_ERROR]: 'Error Page',
        [STATE_SUCCESS]: 'Order complete'
    }
}

module.exports = lookups;