import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const signupValidator = [
    body("name").notEmpty().withMessage("name required"),
    body("email").notEmpty().trim().isEmail().withMessage("valid email required"),
    body("password")
        .notEmpty()
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should atleast contain 6 characters"),
];
//# sourceMappingURL=validator.js.map