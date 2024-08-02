import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() })
    }
}

export const loginValidator = [
  body("email").notEmpty().trim().isEmail().withMessage("valid email required"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should atleast contain 6 characters"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("name required"),
  body("email").notEmpty().trim().isEmail().withMessage("valid email required"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should atleast contain 6 characters"),
];

export const messageValidator = [
    body("message").notEmpty().withMessage("message required")
]
