import express from 'express'
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword } from '../controllers/authController.js'
import { check } from 'express-validator'

const router = express.Router()

router.post('/',
    [
        check('email', 'Por favor digite un email válido').isEmail(),
        check('password', 'Por favor ingrese un password con más de 8 caracteres').isLength({ min: 8 })
    ],
    createUser)

router.get('/verify', verifyToken)
router.post('/login', logInUser)

router.post('/request-password-reset', getResetPassword)
router.post('/reset-password', setNewPassword)

export default router
