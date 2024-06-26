const { ValidationError } = require("joi");

exports.errorHandler = () => ({
    onError: (handler, next) => {
        if (handler.error instanceof ValidationError) {
            handler.response = {
                statusCode: 400,
                body: JSON.stringify({ detail: handler.error.details }),
            };
        } else {
            handler.response = {
                statusCode: 500,
                body: JSON.stringify({ detail: "Internal server error" }),
            };
        }

        next();
    },
});