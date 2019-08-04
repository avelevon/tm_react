const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const Date = require('./model/date');
const Target = require('./model/target');
const Schedule = require('./model/schedule');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

//users
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


//dates
app.get('/dates', async (req, res) => {
    const dates = await Date.find().sort({dayNumber: 1});
    res.json(dates);
});

app.post('/dates', (req, res) => {
    let dates = req.body;
    dates.forEach(async (item) => {
        let date = new Date(item);
        await date.save();
    });

    res.json(dates);
});


//targets
app.get('/targets', async (req, res) => {
    const targets = await Target.find();
    res.json(targets);
});

app.post('/targets', async (req, res) => {
    let target = new Target(req.body);
    target = await target.save();

    res.json(target);

});

app.delete('/targets', async (req, res, next) => {
    await Target.deleteOne(req.body);
    next()
}, async (req, res) => {
    const targets = await Target.find();
    res.json(targets);
});


//schedule
app.get('/schedules', async (req, res) => {
    const schedules = await Schedule.find();
    res.json(schedules);
});

app.post('/schedules', async (req, res) => {
    let schedule = new Schedule(req.body);
    schedule = await schedule.save();

    res.json(schedule);

});

app.delete('/schedules', async (req, res, next) => {
    await Schedule.deleteOne(req.body);
    next()
}, async (req, res) => {
    const schedules = await Schedule.find();
    res.json(schedules);
});

app.listen(3000, () => {
    console.log('Server started');
});