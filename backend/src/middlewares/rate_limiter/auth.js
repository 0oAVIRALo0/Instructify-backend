import { basicLimiter } from './index.js';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const registerLimiter = basicLimiter({
  windowSeconds: 3600,
  maxRequests: 30,
  message: 'Sorry, you have tried to sign up too many times. Please send us a note at enveave@iiitd.ac.in, and we\'ll set this up for you.'
});
const forgotPasswordLimiter = basicLimiter({
  windowSeconds: 10 * 60,
  maxRequests: 40,
  message: 'Too many requests, please try again later.'
});
const loginLimiter = basicLimiter({
  windowSeconds: 10 * 60,
  maxRequests: 200,
  message: 'Too many requests, please try again later.'
});

export { authLimiter, registerLimiter, forgotPasswordLimiter, loginLimiter };
