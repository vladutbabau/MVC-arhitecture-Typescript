"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users/users.controller");
const user_model_1 = require("../models/user.model");
class UsersRoute {
    constructor() {
        this.usersController = new users_controller_1.UsersController();
    }
    routes(app) {
        app.get("/", (req, res) => {
            this.usersController.getAll((err, users) => {
                if (err) {
                    res.status(400);
                    res.send({ message: err });
                }
                else {
                    res.send(users);
                }
            });
        });
        app.get("/:id", (req, res) => {
            const id = parseInt(req.params.id, 10);
            const user = this.usersController.get(id, (err, user) => {
                if (err) {
                    res.status(400);
                    res.send({ message: err });
                }
                else {
                    res.send(user);
                }
            });
        });
        app.post("/", (req, res) => {
            const body = req.body;
            const user = new user_model_1.UserModel(body);
            this.usersController.add(user, (err, response) => {
                if (err) {
                    res.status(400);
                    res.send({ message: err });
                }
                else {
                    res.send(response);
                }
            });
        });
    }
}
exports.default = UsersRoute;
