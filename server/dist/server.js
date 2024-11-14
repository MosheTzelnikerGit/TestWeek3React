"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./src/config/db"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const ammoRoutes_1 = __importDefault(require("./src/routes/ammoRoutes"));
// import { createServer } from "http";
// import { initializeSocketServer } from "./src/socketServer";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
// const httpServer = createServer(app);
// const io = initializeSocketServer(httpServer);
app.use('/api', authRoutes_1.default);
app.use('/api', ammoRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map