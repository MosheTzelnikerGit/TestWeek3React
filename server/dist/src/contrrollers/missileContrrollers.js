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
exports.getDetailsOfAmmo = exports.getResources = void 0;
const Organization_1 = __importDefault(require("../models/Organization"));
const Missile_1 = __importDefault(require("../models/Missile"));
const getResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organization, region } = req.body;
    try {
        let existOrganization;
        if (region) {
            existOrganization = yield Organization_1.default.findOne({ name: `${organization} - ${region}` });
        }
        if (!existOrganization) {
            existOrganization = yield Organization_1.default.findOne({ name: organization });
        }
        if (!existOrganization) {
            res.status(400).json({ message: "Organization not found", success: false });
            return;
        }
        const resources = existOrganization.resources.map((r) => r.name);
        res.status(200).json({ data: existOrganization.resources, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve defense tools." });
    }
});
exports.getResources = getResources;
const getDetailsOfAmmo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ammo = req.params.name;
    try {
        const details = yield Missile_1.default.findOne({ name: ammo });
        res.status(200).json({ data: details, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "error", success: false });
    }
});
exports.getDetailsOfAmmo = getDetailsOfAmmo;
//# sourceMappingURL=missileContrrollers.js.map