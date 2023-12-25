const express = require("express");
const bcrypt = require('bcrypt');
const {Usermodel} = require("../models/User.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    const {name, email, pass, age} = req.body;
try {
    bcrypt.hash(pass, 5, async(err, secured_password) => {
        if(err) {
            console.log(err);
        }
        else {
            const user = new Usermodel({name, email, pass: secured_password, age});
            await user.save();
            res.send("Registered");
            console.log("Registered");
        }
    });
} catch (err) {
    res.send("Err in registering the user");
    console.log(err);
}
})

userRouter.post("/login", async(req, res) => {
const {email, pass} = req.body;
try {
    let user = await Usermodel.find({email});
    const hashed_password = user[0].pass;
    if(user.length > 0) {
        bcrypt.compare(pass, hashed_password, (err, result) => {
            if(result) {
                const token = jwt.sign({ userID: user[0]._id }, "masai")
                res.send({msg:"Loged In", token: token})
            }
            else {
                res.send("Wrong Credentials")
                console.log(err);
            }
        });
    }
    else {
        res.send("Wrong Credentials")
    }
} catch (err) {
    res.send("Something went wrong while logging");
    console.log(err);
}
})


module.exports = {
    userRouter
};



// app.get("/about", (req, res) => {
// res.send("About Page")
// })

// app.get("/data", (req, res) => {
// const token = req.headers.authorization;
// jwt.verify(token, 'masai', (err, decoded) => {
//     if(err) {
//         res.send("Please Login First");
//     }
//     else {
//         res.send("Data.....")
//     }
// });
// });

// app.get("/cart", (req, res) => {
// const token = req.headers.authorization
// jwt.verify(token, 'masai', (err, decoded) => {
//     if(err) {
//         res.send("Please Login First");
//     }
//     else {
//         res.send("Cart Products.....")
//     }
// });
// });

// app.get("/contact", (req, res) => {
// res.send("Contact Page")
// })