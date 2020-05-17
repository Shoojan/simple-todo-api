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
const todo_1 = require("../model/todo");
const tsoa_1 = require("tsoa");
let TodoController = class TodoController extends tsoa_1.Controller {
    async getAll() {
        try {
            let items = await todo_1.TodoModel.find({});
            items = items.map((item) => { return { id: item._id, description: item.description }; });
            return items;
        }
        catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }
    async create(description) {
        const item = new todo_1.TodoModel({ description: description });
        await item.save();
    }
    async update(id, description) {
        await todo_1.TodoModel.findOneAndUpdate({ _id: id }, { description: description });
    }
    async remove(id) {
        await todo_1.TodoModel.findByIdAndRemove(id);
    }
};
__decorate([
    tsoa_1.Get()
], TodoController.prototype, "getAll", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.BodyProp())
], TodoController.prototype, "create", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.BodyProp())
], TodoController.prototype, "update", null);
__decorate([
    tsoa_1.Delete('/{id}')
], TodoController.prototype, "remove", null);
TodoController = __decorate([
    tsoa_1.Route('/todo')
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map