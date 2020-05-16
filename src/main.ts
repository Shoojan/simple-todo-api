import { appRoute } from './app';
import * as http from 'http';

import * as mongoose from 'mongoose';
import { envs } from '../config';

import * as socketio from "socket.io";

const PORT = process.env.PORT || envs.PORT;
const MONGO_URI = process.env.MONGO_URI || envs.MONGO_URI;
const server = http.createServer(appRoute);
server.listen(PORT);
server.on('listening', async () => {
	console.info(`Listening on port ${PORT}`);
	mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
	mongoose.connection.on('open', () => {
		console.info('Connected to Mongo.');
	});
	mongoose.connection.on('error', (err: any) => {
		console.error(err);
	});
});

// set up socket.io and bind it to our
// http server.
let io = socketio(server);

const users = {}

// whenever a user connects on port via a websocket, log that a user has connected
io.on("connection", (socket: any) => {
	console.log("User connected");
	socket.on('new-user', (name: any) => {
		users[socket.id] = name
		socket.broadcast.emit('user-connected', name)
	})
	socket.on('send-chat-message', (message: any) => {
		socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
	})
	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id])
		delete users[socket.id]
	})
});