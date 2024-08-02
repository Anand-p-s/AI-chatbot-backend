import mongoose from "mongoose";
const partsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});
const chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    parts: [partsSchema],
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map