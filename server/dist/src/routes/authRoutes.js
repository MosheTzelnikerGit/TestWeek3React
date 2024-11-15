"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authContrrollers_1 = require("../contrrollers/authContrrollers");
const router = express_1.default.Router();
router.route('/register').post(authContrrollers_1.register);
router.route('/login').post(authContrrollers_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map