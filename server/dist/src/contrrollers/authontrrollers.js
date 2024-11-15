"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRegistered = new User_1.default(req.body);
        const user = yield User_1.default.findOne({ username: userRegistered.username });
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const savedUser = yield userRegistered.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username: username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.login = login;
//# sourceMappingURL=authontrrollers.js.map