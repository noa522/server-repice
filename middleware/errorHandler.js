// middleware/errorHandler.js

// Error handler middleware - פורמט נדרש: { error: { message: '...' } }
exports.errorHandler = (err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      error: { message }
    });
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      error: { message: `${field} already exists` }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: { message: 'Invalid token' }
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: { message: 'Token expired' }
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Something went wrong!",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
};

// 404 handler for routes not found
exports.notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      availableRoutes: [
        "/api/users/test",
        "/api/users/register", 
        "/api/users/login",
        "/api/recipes",
        "/api/recipes/:id",
        "/api/categories"
      ]
    }
  });
};