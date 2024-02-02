import { CONFIG } from "../config/config.dev";
import { UserModel } from "../models/user.model";
import * as mysql from "mysql";
export class UsersController {
  users: UserModel[] = [];
  mysqlClient;
  constructor() {
    this.users = [];
  }

  getAll(response, error): void {
    this.mysqlClient = mysql.createConnection(CONFIG);
    this.mysqlClient.connect();

    this.mysqlClient.query("SELECT * FROM telacad_users", (err, rows, fields) => {
        if(err){
            error(err);
        } else {
            const users = rows.map(e => new UserModel(e));
            response(users);
        }
    });

    this.mysqlClient.end();
  }

  get(id: number, response, error): void {
    this.mysqlClient = mysql.createConnection(CONFIG);
    this.mysqlClient.connect();

    this.mysqlClient.query(
        "SELECT * FROM telacad_users WHERE id = ?", 
        [id],
    
    (err, rows, fields) => {
        if(err){
            error(err);
        } else {
            const user = new UserModel(rows[0]);
            response(user);
        }
    });

    this.mysqlClient.end();
  }

  add(user: UserModel, response, error): void {
    this.mysqlClient = mysql.createConnection(CONFIG);
    this.mysqlClient.connect();

    this.mysqlClient.query(
        "INSERT INTO telacad_users(userName, surName) VALUES (?, ?);", 
        [user.userName, user.surName],
    
    (err, rows, fields) => {
        if(err){
            error(err);
        } else {
            const user = new UserModel(rows[0]);
            response(user);
        }
    });

    this.mysqlClient.end();
  }
}
