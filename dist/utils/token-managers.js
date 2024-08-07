import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Token not recieved" });
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-managers.js.map