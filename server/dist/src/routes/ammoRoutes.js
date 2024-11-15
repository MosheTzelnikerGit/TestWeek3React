"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const missileContrrollers_1 = require("../contrrollers/missileContrrollers");
const router = express_1.default.Router();
router.route("/ammo").post(missileContrrollers_1.getResources);
router.route("/ammo/:name").get(missileContrrollers_1.getDetailsOfAmmo);
exports.default = router;
//# sourceMappingURL=ammoRoutes.js.map