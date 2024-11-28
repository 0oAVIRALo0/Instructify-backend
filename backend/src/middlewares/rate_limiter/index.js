import rateLimit from "express-rate-limit";

// Function to create a custom rate limiter with dynamic settings
const basicLimiter = ({ windowSeconds, maxRequests, message }) => rateLimit({
  windowMs: windowSeconds * 1000, // windowSeconds converted to milliseconds
  max: maxRequests, // Limit each IP to maxRequests per `window`
  message: { message }, // message to send when rate limit exceeded
  standardHeaders: true, // Include standard RateLimit headers
  legacyHeaders: false, // Disable legacy RateLimit headers
});

export { basicLimiter };
