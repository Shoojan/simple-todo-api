import { UserModel, IUser } from '../model/user';
import { Controller, Route, Get, Post, Body, Put, Delete } from 'tsoa';

@Route('/user')
export class UserController extends Controller {

    @Get()
    public async getAll(): Promise<IUser[]> {
        try {
            let users: any = await UserModel.find({});
            return users;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }

    @Post('/register')
    public async create(@Body() user: IUser): Promise<void> {
        const item = new UserModel({
            name: user.name,
            password: user.password
        });
        await item.save();
    }

    @Post('/login')
    public async login(@Body() user: IUser): Promise<IUser> {
        let activeUser: any = await UserModel.findOne({ name: user.name, password: user.password });
        if (activeUser) {
            return activeUser;
        } else {
            console.error('User not found');
            return null;
        }
    }

    @Put('/{id}')
    public async update(id: string, @Body() user: IUser): Promise<void> {
        await UserModel.findOneAndUpdate(
            { _id: id },
            {
                name: user.name,
                password: user.password
            }
        );
    }

    @Delete('/{id}')
    public async remove(id: string): Promise<void> {
        await UserModel.findByIdAndRemove(id);
    }
}
