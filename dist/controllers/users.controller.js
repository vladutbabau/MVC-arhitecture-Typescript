"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const sql_helper_1 = require("../utils/sql-helper");
const user_model_1 = require("../models/user.model");
class UsersController {
    constructor() {
        this.users = [];
        this.users = [];
    }
    getAll(result) {
        (0, sql_helper_1.executeQuery)('SELECT * FROM telacad_users', (err, rows) => {
            const users = rows.map(row => new user_model_1.UserModel(row));
            result(err, users);
        });
    }
    get(id, result) {
        (0, sql_helper_1.executeQuery)("SELECT * FROM telacad_users WHERE id = ?", (err, rows) => {
            const user = new user_model_1.UserModel(rows[0]);
            result(err, user);
        }, [id]);
    }
    add(user, response) {
        (0, sql_helper_1.executeQuery)("INSERT INTO telacad_users(userName, surName) VALUES (?, ?);", (err, rows) => {
            response(err, "User added");
        }, [user.userName, user.surName]);
    }
}
exports.UsersController = UsersController;
