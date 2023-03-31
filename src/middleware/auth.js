const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
              console.log('Token verification failed:', err.message);
                return res
                .status(401)
                .json({ status: false, message: "Access denied" });
            }

             const user = await User.findById(decoded.user);

            req.user = user;

            next();

        });
    } catch (error) {
        return res
            .status(401)
            .json({ status: false, message: "Access denied" });
    }
};
