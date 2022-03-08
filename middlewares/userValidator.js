const{body} = require(`express-validator`)

exports.validate = [
    body(`password`)
    .isLength({ min : 8})
    .withMessage(`Password must be filled by 8 character`)
    .notEmpty()
    .withMessage(`Password must be filled`),

    body(`username`).notEmpty()
    .withMessage(`Username must be filled`)
]