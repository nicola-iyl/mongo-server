require("./models/User");
require("./models/Track");
const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:admin@cluster0.85e5c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => { console.log('connected to mongo') });
mongoose.connection.on('error', (err) => { console.error('error ', err)});

app.get('/', requireAuth, (req,res) => {
    res.send(`Your Email is ${req.user.email}`);
});



app.listen(3000, () => {
    console.log('Listen in port 3000');
});
