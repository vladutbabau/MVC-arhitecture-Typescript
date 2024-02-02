"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const users_route_1 = require("./routes/users.route");
const app = express();
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
new users_route_1.default().routes(app);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
