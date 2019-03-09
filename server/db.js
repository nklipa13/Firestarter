const mongoose = require('mongoose');

//set up the database
mongoose.connect("mongodb://localhost/firestarter");

mongoose.connection.on('connected', () => {
    console.log("Connected to local mongo database");

    mongoose.set('useCreateIndex', true);
});