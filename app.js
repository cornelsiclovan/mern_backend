const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-errors');
const usersRoutes  = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/places' , placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    throw  new HttpError('Could not find this route', 404);;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error ocurred!'});
});


app.listen(5000);