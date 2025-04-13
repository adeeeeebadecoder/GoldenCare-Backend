// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");

// // const verifyRole = (role) => {
// //   return (req, res, next) => {
// //     if (req.user && req.user.role === role) {
// //       next();
// //     } else {
// //       res.status(403).json({ message: "Forbidden: Insufficient permissions" });
// //     }
// //   };
// // };

// const verifyRole = (role) => {
//   return (req, res, next) => {
//     if (req.user && req.user.role === role) {
//       next();
//     } else {
//       res.status(403).json({ message: "Forbidden: Insufficient permissions" });
//     }
//   };
// };

// // const verifyToken = async (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token)
// //       return res
// //         .status(401)
// //         .json({ message: "Unauthorized: No token provided" });

// //     // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     //   if (err) return res.status(403).json({ message: "Invalid token" });
// //     //   req.user = decoded;
// //     //   next();
// //     // });
// //     const decode = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decode.id).select("-password");
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: "Unauthorized: Invalid token" });
// //   }
// // };

// // const verifyToken = (req, res, next) => {
// //   const token = req.headers.authorization?.split(" ")[1];

// //   if (!token)
// //     return res
// //       .status(403)
// //       .json({ message: "Access denied. No token provided." });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token)
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// // const verifyAdmin = async (req, res, next) => {
// //   try {
// //     const user = await User.findById(req.user.id);
// //     if (!user || user.role !== "admin") {
// //       return res.status(403).json({ message: "Access denied: Admins only" });
// //     }
// //     next();
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // const protect = (req, res, next) => {
// //   let token = req.header("Authorization");
// //   if (!token) return res.status(401).json({ message: "Not authorized" });

// //   try {
// //     token = token.split(" ")[1];
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     console.log(error);

// //     res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// // middlewares/authMiddleware.js

// const verifyAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied: Admins only" });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // const protect = asyncHandler(async (req, res, next) => {
// //   let token;

// //   if (
// //     req.headers.authorization &&
// //     req.headers.authorization.startsWith("Bearer")
// //   ) {
// //     token = req.headers.authorization.split(" ")[1];

// //     try {
// //       const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
// //       req.user = await User.findById(decoded.id).select("-password");
// //       next();
// //     } catch (err) {
// //       if (err.name === "TokenExpiredError") {
// //         // Allow frontend to handle token refresh
// //         return res.status(403).json({ message: "Access token expired" });
// //       } else {
// //         res.status(401).json({ message: "Not authorized, token failed" });
// //       }
// //     }
// //   } else {
// //     res.status(401).json({ message: "Not authorized, no token" });
// //   }
// // });

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (err) {
//       if (err.name === "TokenExpiredError") {
//         return res.status(403).json({ message: "Access token expired" });
//       } else {
//         res.status(401).json({ message: "Not authorized, token failed" });
//       }
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// });

// // const adminOnly = (req, res, next) => {
// //   if (req.user.role !== "admin") {
// //     return res.status(403).json({ message: "Admin access only" });
// //   }
// //   next();
// // };

// const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: "Access Denied: Insufficient permissions" });
//     }
//     next();
//   };
// };

// const authenticateUser = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "Not authenticated" });
//   }
//   next();
// };

// module.exports = {
//   protect,
//   adminOnly,
//   verifyAdmin,
//   verifyToken,
//   verifyRole,
//   authorizeRoles,
//   authenticateUser,
// };

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Middleware to protect routes using JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    try {
      // const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      // console.log(decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Access token expired" });
      } else {
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    }
  } else {
    res.status(401).json({ message: "JsonWebTokenError" });
  }
});

// Middleware to allow only users with specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access Denied: Insufficient permissions" });
    }
    next();
  };
};

// Check if logged-in user is authenticated
const authenticateUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

// Middleware to allow only admin users
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// Middleware to manually verify token (optional use)
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Middleware to allow access based on a specific role
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
  };
};

// Middleware to check if current user is admin (async version)
const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  protect,
  adminOnly,
  verifyAdmin,
  verifyToken,
  verifyRole,
  authorizeRoles,
  authenticateUser,
};
