import { CONFIG } from "../config/config.dev";
import * as mysql from "mysql";

export function executeQuery(query: string, cb, args?: any[]) {
    const mysqlClient = mysql.createConnection(CONFIG);
    mysqlClient.connect();
    mysqlClient.query(
        query,
        args,
        (err, rows) => cb(err, rows));
    mysqlClient.end();

}