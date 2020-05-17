import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './middleware/request.logger.middleware';
import './controller/todo.controller';
import './controller/user.controller';

import { RegisterRoutes } from './dist/routes';
import * as swaggerUi from 'swagger-ui-express';

import * as path from "path";

const appRoute = express();
appRoute.use(cors());
appRoute.use(bodyparser.json({ limit: "50mb" }));
appRoute.use(bodyparser.urlencoded({
	extended: true,
	limit: "50mb",
	parameterLimit: 500000
}));

appRoute.use(requestLoggerMiddleware);
RegisterRoutes(appRoute);

try {
	const swaggerDocument = require('../swagger.json');
	appRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
	console.error('Unable to read swagger.json', err);
}

appRoute.get("/", (req: any, res: any) => {
	res.sendFile(path.resolve("./client/index.html"));
});

appRoute.get("/chatbox", (req: any, res: any) => {
	res.sendFile(path.resolve("./client/chatbox.html"));
});

export { appRoute };
