const express = require('express');
const app = express();
const itemRoutes = require('./item/itemRoutes')
const ExpressError = require('./expressError');
const middleware = require('./middleware');



app.use(express.json());
app.use(middleware.logger);


app.use('/items', itemRoutes);


app.get('/favicon.ico', (req, res) => res.sendStatus(204));


// 404 Handler
app.use(function (req, res, next) {
    next(new ExpressError("NOT FOUND", 404));
});


app.use(function(err, req, res, next){
    let status = err.status || 500;

    return res.status(status).json({
        error:{
            message: err.message,
            status: status
        }
    });
});


module.exports = app;