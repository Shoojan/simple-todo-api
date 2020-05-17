"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const request_logger_middleware_1 = require("./middleware/request.logger.middleware");
require("./controller/todo.controller");
require("./controller/user.controller");
const routes_1 = require("./dist/routes");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const appRoute = express();
exports.appRoute = appRoute;
appRoute.use(cors());
appRoute.use(bodyparser.json({ limit: "50mb" }));
appRoute.use(bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 500000
}));
appRoute.use(request_logger_middleware_1.requestLoggerMiddleware);
routes_1.RegisterRoutes(appRoute);
try {
    const swaggerDocument = require('../swagger.json');
    appRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
catch (err) {
    console.error('Unable to read swagger.json', err);
}
// simple '/' endpoint sending a Hello World
// response
appRoute.get("/", (req, res) => {
    // res.send("hello world");
    res.sendFile(path.resolve("./client/index.html"));
});
//# sourceMappingURL=app.js.map