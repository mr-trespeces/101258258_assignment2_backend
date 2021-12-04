const mongoose = require('mongoose');

validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const EmployeeSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: [true, 'First Name Required']
    },
    lastname:{
        type: String,
        required: [true, 'Last Name Required']
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})



const Employee = mongoose.model("employee", EmployeeSchema)
module.exports = Employee