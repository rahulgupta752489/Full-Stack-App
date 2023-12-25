const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
    title: String,
    note: String,
    category: String,
    userID: String
}, {
    versionKey: false
})


const Notemodel = mongoose.model("note", noteSchema);


module.exports = {
    Notemodel
};