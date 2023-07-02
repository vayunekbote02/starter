const jwt = require("jsonwebtoken");

// Middleware function to authenticate the token
const authenticateToken = (req, res, next) => {
  try {
    // Retrieve the token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      // Token not provided, return unauthorized
      return res.sendStatus(401);
    }

    // Verify the token
    jwt.verify(token, "securejwtkey", (err, payload) => {
      if (err) {
        // Token verification failed, return forbidden
        return res.sendStatus(403);
      }

      // Token is valid, set the email on the request object, this ayload email is being signed while login, also name.
      req.email = payload.email;
      req.name = payload.name;
      //   console.log(req.name, req.email);
      next();
    });
  } catch (error) {
    // Error occurred, return internal server error
    res.sendStatus(500);
  }
};

// Export the middleware function
module.exports = authenticateToken;
