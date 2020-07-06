const express = require("express");
const shortid = require("shortid");

const app = express();
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


app.listen(PORT, ADDRESS, () => {
    console.log("Server is running...");
});