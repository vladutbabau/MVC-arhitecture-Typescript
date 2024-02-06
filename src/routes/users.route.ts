import { UsersController } from "../controllers/users/users.controller";
import { UserModel } from "../models/user.model";

export default class UsersRoute {
  usersController = new UsersController();
  constructor() {}

  routes(app) {
    
    app.get("/", (req, res) => {
      this.usersController.getAll((err, users) => {
        if (err) {
          res.status(400);
          res.send({ message: err });
        } else {
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
        } else {
          res.send(user);
        }
      });
    });

    app.post("/", (req, res) => {
      const body = req.body;
      const user = new UserModel(body);
      this.usersController.add(user, (err, response) => {
        if (err) {
          res.status(400);
          res.send({ message: err });
        } else {
          res.send(response);
        }
      });
    });
  }
}
