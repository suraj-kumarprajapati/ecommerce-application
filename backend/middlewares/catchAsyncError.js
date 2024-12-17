
function catchAsyncErrors(controllerFunction) {
    return function (req, res, next) {
        Promise.resolve(controllerFunction(req, res, next)).catch(next);
    };
}

export default catchAsyncErrors;


// export default (controllerFunction) => (req, res, next) =>
//     Promise.resolve(controllerFunction(req, res, next)).catch(next);