const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const Date = require('./model/date');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/users', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();

    res.json(user);

});

app.delete('/users', async (req, res, next) => {
    await User.deleteOne(req.body);
    next()
}, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/dates', async (req, res) => {
    const dates = await Date.find();
    res.json(dates);
});

app.post('/dates', async (req, res) => {
    let date = new Date(req.body);
    date = await date.save();

    res.json(date);

});


app.listen(3000, () => {
    console.log('Server started');
});