const express = require("express");
const shortid = require("shortid");

const app = express();

const PORT = 8000;
const ADDRESS = "127.0.0.1";


// Middleware

app.use(express.json());

// If the received data is invalid, respond with an error message
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        console.error(err);

        return res.status(400).send({
            error: "SyntaxError. Please check the request data."
        });
    }
    next();
});


// Sample initial data

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
    
    try {
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
    } catch (error) {
        res.status(500).json({
            error: "An error has occured on the server"
        });
    }

});



app.listen(PORT, ADDRESS, () => {
    console.log("Server is running...");
});