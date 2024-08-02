import { compare, hash } from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/token-managers.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUser = async (req, res, next) => {
    try {
        // get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res) => {
    try {
        // user sign up
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(402).send("email already taken");
        }
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // clear cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "ai-chatbot-frontend-z4th.onrender.com",
            signed: true,
            path: "/",
            secure: true
        });
        // create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "ai-chatbot-frontend-z4th.onrender.com",
            expires,
            httpOnly: true,
            signed: true,
            secure: true
        });
        return res
            .status(201)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        // user Login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("user not found");
        }
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send("Password is incorrect");
        }
        // clear cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: ".onrender.com",
            signed: true,
            path: "/",
            secure: true
        });
        // create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: ".onrender.com",
            expires,
            httpOnly: true,
            signed: true,
            secure: true
        });
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res) => {
    try {
        // verifying the user
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // clear cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map
