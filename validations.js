import { body } from "express-validator";

export const loginValidation = [
    body('email','Not variable for of email').isEmail(),
    body('password', 'Password need min 5 symbols').isLength({ min:  5 }),
]
export const registerValidation = [
    body('fullName', 'Enter the correct name').isLength({ min:  3 }),
    body('email','Not variable for of email').isEmail(),
    body('password', 'Password need min 5 symbols').isLength({ min:  5 }),
    body('address', 'Address not accessible').isLength({ min: 3}),
    body('avatarUrl', 'Not variable url ').optional().isURL(),
]
export const productCreateValidation = [
    body('title','Enter article title').isLength({min:3}).isString(),
    body('text', 'Enter post text').isLength({ min:  5 }).isString(),
    body('price', 'Enter normal price').isLength({ min:2}).isNumeric(),
    body('currency', 'Enter valid currency').isLength({ min:1}).isString(),
    body('tags', 'Not variable tags').optional().isString(),
    body('imageUrl', 'Not variable url ').optional().isString(),
]