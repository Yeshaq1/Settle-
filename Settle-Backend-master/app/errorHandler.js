module.exports = function(err) {
    let errorMessages = {};
    for (let errKey in err.errors) {
        if (err.errors.hasOwnProperty(errKey)) {
            errorMessages.message = err.errors[errKey].message;
            //errorMessages.push(err.errors[errKey].message);
        }
    }
    return errorMessages;
};
