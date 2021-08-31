const express = require('express');
const morgan = require('morgan');
const app = express();

// local imports
const { port } = require('./config');


app.use(express.json({
    extended: true
}));

app.use(morgan('dev'));


// Routes
const routes = require('./routes');

app.use('/', routes);

app.listen(port, (error, server) => {
    if (error) {
        console.log('Error while starting the server', error);
    }

    console.log(`Server is listening on port ${port}`);
});