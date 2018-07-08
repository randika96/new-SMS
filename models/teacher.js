var mongoose = require("mongoose");

var teacherSchema = mongoose.Schema({
    firstName    : String,
    secondName    : String,
    authent : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        index_no: String
    },
    email      : String,
    birthDay   : String,
    address    : String,
    username : String,
    noOfLeave: Number
});

module.exports = mongoose.model("Teacher", teacherSchema);