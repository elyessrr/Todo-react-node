const express = require('express');
const cors = require('cors');
//DB
const mongoose = require('mongoose');


var MongoClient = require('mongodb').MongoClient;


var url = "mongodb://localhost:27017/Todo";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/*

  mongoose.connect("mongodb://localhost:27017/Todo", { useNewUrlParser: true, useCreateIndex: true }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    })*/

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});