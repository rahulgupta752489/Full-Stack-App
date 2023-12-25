const express = require("express");
const {connection} = require("./config/db");
const {userRouter} = require("./routes/User.route");
const {noteRouter} = require("./routes/Note.route");
const {authenticate} = require("./middlewares/authenticate.middleware");
var cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Home Page")
})

app.use("/users", userRouter)
app.use(authenticate);
app.use("/notes", noteRouter); 




app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("Connected to DB");
    } catch (err) {
        console.log("404: Something Went Wrong While Connecting to DB");
        console.log(err);
    }
    console.log(`App is running at port ${process.env.port}`);
})