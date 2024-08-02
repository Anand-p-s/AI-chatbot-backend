import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User.js";
export const generateChat = async (req, res, next) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        const chats = user.chats.map(({ role, parts }) => ({
            role,
            parts: parts.map((part) => ({ text: part.text })),
        }));
        // add user's msg to chat history
        chats.push({ parts: [{ text: message }], role: "user" });
        user.chats.push({ parts: [{ text: message }], role: "user" });
        // send all chats with new one
        const chat = model.startChat({
            history: chats,
        });
        const result = await chat.sendMessage(message);
        const response = await result.response;
        // add AI response to chat history
        user.chats.push({ role: "model", parts: [{ text: response.text() }] });
        // save the updated user chats
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error generating chat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const sendAllChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteAllChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ messsage: "OK" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=chat-controllers.js.map