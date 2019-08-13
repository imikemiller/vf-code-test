const ERROR_NO_STOCK = 'NO_STOCK';
const ERROR_INCORRECT_DETAILS = 'INCORRECT_DETAILS';
const STATE_PROCESSING = 'processing';
const STATE_ERROR = 'error';
const STATE_SUCCESS = 'success';

module.exports = {
    constants: {
        ERROR_NO_STOCK, ERROR_INCORRECT_DETAILS, STATE_ERROR, STATE_PROCESSING, STATE_SUCCESS
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