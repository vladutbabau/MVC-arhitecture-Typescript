import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import UsersRoute from './routes/users.route';

const app = express();
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({extended: false}));

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

new UsersRoute().routes(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})