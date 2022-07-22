const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js')

const DB_URL = "mongodb+srv://dbAdmin:dbadminpassword@comp3123.40oze.mongodb.net/react-crud?retryWrites=true&w=majority"
const app = express();
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(employeeRouter)

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});