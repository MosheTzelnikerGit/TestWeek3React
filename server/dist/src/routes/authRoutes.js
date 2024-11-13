"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authontrrollers_1 = require("../contrrollers/authontrrollers");
const router = express_1.default.Router();
router.route('/register').post(authontrrollers_1.register);
router.route('/login').post(authontrrollers_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map