const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const url = "mongodb://localhost:27017/usersdb";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/adduser", async (req, res) => {
    try {
        const user = new User({ name: req.body.name, age: parseInt(req.body.age) });
        const result = await user.save();
        console.log(result);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/deleteuser", async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.body.id });
        console.log(result);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/updateuser", async (req, res) => {
    try {
        const result = await User.updateOne(
            { _id: req.body.id },
            { $set: { name: req.body.name, age: parseInt(req.body.age) } }
        );
        console.log(result);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        console.log(err);
    }
});

app.get("/users", async (req, res) => {
    try {
        const results = await User.find();
        res.send(results);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
