"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const axios_1 = __importDefault(require("axios"));
const AmmoAndAttacks = () => {
    const [ammo, setAmmo] = (0, react_1.useState)([]);
    const [attacks, setAttacks] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const token = (0, react_redux_1.useSelector)((state) => state.user.token);
    (0, react_1.useEffect)(() => {
        if (token) {
            // שליחה לבקשה ל-API
            const fetchAmmoAndAttacks = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    setLoading(true);
                    const ammoResponse = yield axios_1.default.get("http://localhost:3000/api/ammo", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const attacksResponse = yield axios_1.default.get("http://localhost:3000/api/attacks", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setAmmo(ammoResponse.data);
                    setAttacks(attacksResponse.data);
                }
                catch (err) {
                    setError("Failed to fetch data");
                }
                finally {
                    setLoading(false);
                }
            });
            fetchAmmoAndAttacks();
        }
    }, [token]);
    return (<div className="ammo-and-attacks">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="ammo-list">
        <h2>Ammo Inventory</h2>
        <ul>
          {ammo.length > 0 ? (ammo.map((item) => (<li key={item.id}>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Status: {item.status}</p>
              </li>))) : (<p>No ammo available.</p>)}
        </ul>
      </div>

      <div className="attack-list">
        <h2>Attacks</h2>
        <ul>
          {attacks.length > 0 ? (attacks.map((attack) => (<li key={attack.id}>
                <h3>{attack.name}</h3>
                <p>Status: {attack.status}</p>
                <p>Time left: {attack.timeLeft}</p>
              </li>))) : (<p>No active attacks.</p>)}
        </ul>
      </div>
    </div>);
};
exports.default = AmmoAndAttacks;
//# sourceMappingURL=AmmoAndAttacks.js.map