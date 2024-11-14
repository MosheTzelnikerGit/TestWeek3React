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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Organization_1 = __importDefault(require("../models/Organization"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, organization, region } = req.body;
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        if (organization === "IDF" && !region) {
            res.status(400).json({ message: 'Region is required for IDF' });
            return;
        }
        const userOrganization = region
            ? yield Organization_1.default.findOne({ name: `${organization} - ${region}` })
            : yield Organization_1.default.findOne({ name: organization });
        if (!userOrganization) {
            res.status(400).json({ message: 'Organization not found' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
            organization,
            resources: userOrganization.resources,
            region,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const decipheredPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!decipheredPassword) {
            res.status(400).json({ message: 'Invalid credentials', success: false });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, organization: user.organization, region: user.region, resources: user.resources }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user, success: true });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.login = login;
//# sourceMappingURL=authContrrollers.js.map