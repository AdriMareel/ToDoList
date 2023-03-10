require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const setupLoginRoute = require('./back/routes/login');
const setupRegisterRoute = require('./back/routes/register');
const setupManageTasksRoute = require('./back/routes/manageTasks');
const setupMongo = require('./back/mongo');
const path = require('path');
const {verifyJWT} = require('./back/middleware/cookieAuthJWT.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setupMongo();

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/index.html');
});

app.get('/list', verifyJWT, (req, res) => {
    res.sendFile(__dirname + '/front/list.html');
});

setupLoginRoute(app);
setupRegisterRoute(app);
setupManageTasksRoute(app);