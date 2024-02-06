import { executeQuery } from "../../utils/sql-helper";
import { UserModel } from "../../models/user.model";
import * as fs from "fs";
export class UsersController {
  getAll(result): void {
    const sqlString = fs.readFileSync(__dirname + "/getAllUsers.sql", "utf-8");
    executeQuery(sqlString, (err, rows) => {
      const users = rows.map((row) => new UserModel(row));
      result(err, users);
    });
  }

  get(id: number, result): void {
    const sqlString = fs.readFileSync(__dirname + "/getUser.sql", "utf-8");

    executeQuery(
      sqlString,
      (err, rows) => {
        const user = new UserModel(rows[0]);
        result(err, user);
      },
      [id]
    );
  }

  add(user: UserModel, response): void {
    const sqlString = fs.readFileSync(__dirname + "/insertUser.sql", "utf-8");
    executeQuery(
      sqlString,
      (err, rows) => {
        response(err, "User added");
      },
      [user.userName, user.surName]
    );
  }
}
