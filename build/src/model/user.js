"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    password: String
});
const UserModel = mongoose.model('User', UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map