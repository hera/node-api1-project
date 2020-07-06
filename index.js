const express = require("express");
const shortid = require("shortid");

const app = express();
app.use(express.json());

const PORT = 8000;
const ADDRESS = "127.0.0.1";

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    }
];


// Get all users

app.get("/api/users", (req, res) => {
    res.json(users);
});



// Post a new user

app.post("/api/users", (req, res) => {
    let receivedData = req.body;

    if (receivedData.name && receivedData.bio) {

        let newUser = {
            id: shortid.generate(),
            name: receivedData.name,
            bio: receivedData.bio
        };

        users.push(newUser);

        res.status(201).json(newUser);

    } else {
        res.status(400).json({
            error: "Please provide user name and bio"
        });
    }

});



app.listen(PORT, ADDRESS, () => {
    console.log("Server is running...");
});