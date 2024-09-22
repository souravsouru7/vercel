// backend/src/interfaces/routes/authRoutes.js

const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/verify-otp', AuthController.verifyOtp);
router.post("/login",AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
module.exports = router;
