const { validationResult } = require('express-validator');

/**
 * Middleware to validate request data.
 * @param {Array} validations - An array of express-validator checks.
 */
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(v => v.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array(),
                message: 'Validation error'
            });
        }

        next(); // proceed to the controller if validation passed
    };
};

module.exports = validate;
