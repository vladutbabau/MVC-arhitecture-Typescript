import { UsersController } from "../controllers/users.controller";
import { UserModel } from "../models/user.model";

export default class UsersRoute{
    usersController = new UsersController();
    constructor(){

    }

    routes(app){
        app.get('/', (req, res)=>{
            this.usersController.getAll( users => {
                res.send(users);
            }, err => {
                res.status(400);
                res.send({message: err});
            });
        });

        app.get('/:id', (req, res)=>{
            const id = parseInt(req.params.id, 10);
            const user = this.usersController.get(id, user => {
                res.send(user);
            }, err => {
                res.status(400);
                res.send({message: err});
            });
        })

        app.post('/', (req, res)=>{
            const body = req.body;
            const user = new UserModel(body);
            this.usersController.add(user, response => {
                res.send(response);
            }, error => {
                res.status(400);
                res.send({message: error});
            });
        })

    }
}