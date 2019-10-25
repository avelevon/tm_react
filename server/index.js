const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const Date = require('./model/date');
const Target = require('./model/target');
const Schedule = require('./model/schedule');
const auth = require('./middleware/auth');
const cors = require('cors');
const bcrypt = require('bcryptjs');


mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': 'http://localhost:8080',
//     'credentials': 'true',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
// }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

//users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/users/:userId', async (req, res) => {
    const user = await User.findOne({_id: req.params.userId});
    res.json(user);
});

app.post('/users', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});

});

app.post('/users/:userId', async (req, res) => {
    await User.updateOne({_id: req.body._id}, {
        $set: {
            'name': req.body.name,
            'email': req.body.email,
            'password': await bcrypt.hash(req.body.password, 8),
        }
    }, {returnNewDocument: true});
    const user = await User.findOne({_id:  req.body._id});
    res.status(201).send({user});
});

app.get('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

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
    const targets = await Target.find().sort({sn: 1});
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
    if (req.body.scheduleId) {
        await Schedule.updateOne({_id: req.body.scheduleId}, req.body);
        const schedule = await Schedule.findOne({_id: req.body.scheduleId});
        res.json(schedule);
    } else {
        let schedule = new Schedule(req.body);
        schedule = await schedule.save();
        res.json(schedule);
    }
});

app.delete('/schedules', async (req, res, next) => {
    await Schedule.deleteOne(req.body);
    next()
}, async (req, res) => {
    const schedules = await Schedule.find();
    res.json(schedules);
});


//authorization
app.post('/auth', async (req, res) => {
    //Login a registered user
    try {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.send({user, token})
    } catch (error) {
        res.status(400).send({'error': error.message })
    }

});

app.get('/auth', auth, async (req, res) => {
   res.send({
       'user': req.user,
       'token': req.token
   });
});

app.listen(3000, () => {
    console.log('Server started...');
});
