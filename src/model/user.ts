import * as mongoose from 'mongoose';

interface IUser {
    name: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    name: String,
    password: String
});

const UserModel = mongoose.model('User', UserSchema);

export { UserModel, IUser }