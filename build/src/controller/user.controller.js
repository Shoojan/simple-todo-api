"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const tsoa_1 = require("tsoa");
let UserController = class UserController extends tsoa_1.Controller {
    async getAll() {
        try {
            let users = await user_1.UserModel.find({});
            return users;
        }
        catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }
    async create(user) {
        const item = new user_1.UserModel({
            name: user.name,
            password: user.password
        });
        await item.save();
    }
    async login(user) {
        let activeUser = await user_1.UserModel.findOne({ name: user.name, password: user.password });
        if (activeUser) {
            return activeUser;
        }
        else {
            console.error('User not found');
            return null;
        }
    }
    async update(id, user) {
        await user_1.UserModel.findOneAndUpdate({ _id: id }, {
            name: user.name,
            password: user.password
        });
    }
    async remove(id) {
        await user_1.UserModel.findByIdAndRemove(id);
    }
};
__decorate([
    tsoa_1.Get()
], UserController.prototype, "getAll", null);
__decorate([
    tsoa_1.Post('/register'),
    __param(0, tsoa_1.BodyProp())
], UserController.prototype, "create", null);
__decorate([
    tsoa_1.Post('/login'),
    __param(0, tsoa_1.BodyProp())
], UserController.prototype, "login", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.BodyProp())
], UserController.prototype, "update", null);
__decorate([
    tsoa_1.Delete('/{id}')
], UserController.prototype, "remove", null);
UserController = __decorate([
    tsoa_1.Route('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map