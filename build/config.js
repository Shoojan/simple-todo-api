"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const { parsed: envs } = result;
exports.envs = envs;
//# sourceMappingURL=config.js.map