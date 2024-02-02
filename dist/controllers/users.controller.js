"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const config_dev_1 = require("../config/config.dev");
const user_model_1 = require("../models/user.model");
const mysql = require("mysql");
class UsersController {
    constructor() {
        this.users = [];
        this.users = [];
    }
    getAll(response, error) {
        this.mysqlClient = mysql.createConnection(config_dev_1.CONFIG);
        this.mysqlClient.connect();
        this.mysqlClient.query("SELECT * FROM telacad_users", (err, rows, fields) => {
            if (err) {
                error(err);
            }
            else {
                const users = rows.map(e => new user_model_1.UserModel(e));
                response(users);
            }
        });
        this.mysqlClient.end();
    }
    get(id, response, error) {
        this.mysqlClient = mysql.createConnection(config_dev_1.CONFIG);
        this.mysqlClient.connect();
        this.mysqlClient.query("SELECT * FROM telacad_users WHERE id = ?", [id], (err, rows, fields) => {
            if (err) {
                error(err);
            }
            else {
                const user = new user_model_1.UserModel(rows[0]);
                response(user);
            }
        });
        this.mysqlClient.end();
    }
    add(user, response, error) {
        this.mysqlClient = mysql.createConnection(config_dev_1.CONFIG);
        this.mysqlClient.connect();
        this.mysqlClient.query("INSERT INTO telacad_users(userName, surName) VALUES (?, ?);", [user.userName, user.surName], (err, rows, fields) => {
            if (err) {
                error(err);
            }
            else {
                const user = new user_model_1.UserModel(rows[0]);
                response(user);
            }
        });
        this.mysqlClient.end();
    }
}
exports.UsersController = UsersController;
