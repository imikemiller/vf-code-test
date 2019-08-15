const fs = require('fs')
const getProcessingPageHelper = require('./getProcessingPage/index')
/**
 
  Vodafone coding challenge
 
  You have been tasked with creating a helper function that will be used to determine the output
  of an array of data.

  Each element of the array has the following structure:

    {
      state: <String> - a state to go to
      errorCode: <String> - optional error code
    }

  The states have different functionalities:

    'processing' = delay by 2 seconds, then fetch the next state
    'error' = handle the error code provided (see below)
    'success' = return from the helper with the object: { title: 'Order complete' message: null }

  Handling error codes:

    'NO_STOCK' = return from the helper with an object: { title: 'Error page', message: 'No stock has been found' }
    'INCORRECT_DETAILS' = return from the helper with an object: { title: 'Error page', message: 'Incorrect details have been entered' }
    null = return from the helper with an object: { title: 'Error page', message: null }
    undefined = return from the helper with an object: { title: 'Error page', message: null }

  Example usage:
  -------
  getProcessingPage([{ state: 'processing' }, { state: 'error' }])
  => should return after 2 seconds with the object: { title: 'Error page', message: null }

  Notes:
  - Provide the code and a description of how to run it
**/

/**
 * Please see README.md for descriptions of how to run the code
 */


/**
 * Gets the processing page
 * @param {array} data 
 */
function getProcessingPage(data) {
  getProcessingPageHelper(data).then(result => {
    console.log(result);
  })
}

/**
 * Retrieve sample data from a JSON file
 */
let filePath = process.argv[2];
if (!filePath) throw Error('No JSON file')

/**
 * Parse and call function
 */
let file = fs.readFileSync(filePath);
let data = JSON.parse(file);
getProcessingPage(data)

