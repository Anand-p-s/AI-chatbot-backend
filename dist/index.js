import app from "./app.js";
import { connectToDb } from "./db/connection.js";
const PORT = process.env.PORT || 5000;
// connections amd listeners
connectToDb()
    .then(() => {
    app.listen(PORT, () => console.log("server opened in port ", PORT));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map