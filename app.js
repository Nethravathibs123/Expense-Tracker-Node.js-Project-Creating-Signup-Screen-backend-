const express = require('express');
const app = express();
const sequelize = require ('./util/database');

const cors = require("cors");
const Users = require ('./models/user');

const userRoutes = require('./routes/user');
app.use(express.static('public'));

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);



app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
const port = 3000;

Users.sync();
sequelize
.sync()
.then((result) => {
    console.log(`server is working on http://localhost:${port}`);
   app.listen(port);
}).catch((err) => {
    console.log(err)
});