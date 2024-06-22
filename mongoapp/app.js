const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/adduser", async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        let user = { name: req.body.name, age: parseInt(req.body.age) };
        const result = await collection.insertOne(user);

        console.log(result.ops);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});

app.post("/deleteuser", async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        const result = await collection.deleteOne({ _id: new ObjectId(req.body.id) });

        console.log(result);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});

app.post("/updateuser", async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        const result = await collection.updateOne(
            { _id: new ObjectId(req.body.id) },
            { $set: { name: req.body.name, age: parseInt(req.body.age) } }
        );

        console.log(result);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        const user = await collection.findOne({ _id: new ObjectId(req.params.id) });

        res.send(user);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});

app.get("/users", async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        const results = await collection.find().toArray();
        res.send(results);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
