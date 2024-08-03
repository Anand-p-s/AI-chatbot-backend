import { Router } from "express";
import { messageValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-managers.js";
import { deleteAllChats, generateChat, sendAllChats, } from "../controllers/chat-controllers.js";
const chatRoutes = Router();
chatRoutes.post("/new", validate(messageValidator), verifyToken, generateChat);
chatRoutes.get("/all-chats", sendAllChats);
chatRoutes.delete("/delete-chats", verifyToken, deleteAllChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map
