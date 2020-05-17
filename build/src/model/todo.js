"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
    description: String
});
const TodoModel = mongoose.model('Todo', TodoSchema);
exports.TodoModel = TodoModel;
//# sourceMappingURL=todo.js.map