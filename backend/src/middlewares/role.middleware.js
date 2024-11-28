import { asyncHandler, errorHandler } from "../utils/index.js";

const verifyRole = (requiredRole) => {
  return asyncHandler(async (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(new errorHandler(403, 'Role not found')); 
    }

    if (userRole !== requiredRole) {
      return next(new errorHandler(403, 'Access denied, insufficient role')); 
    }

    next(); 
  });
};

export { verifyRole };