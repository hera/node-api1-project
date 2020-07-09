require("dotenv").config();
const express = require("express");
const shortid = require("shortid");

const app = express();


// Middleware

app.use(express.json());


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
    try {
        res.json(users);
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            error: "The users information could not be retrieved."
        });
    }
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
        console.error(error);

        res.status(500).json({
            error: "An error has occured on the server"
        });
    }

});


// Get a user by id

app.get("/api/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const position = users.findIndex(user => user.id === id);

        if (position === -1) {
            res.status(404).send({
                error: "User doesn't exist"
            });
        }

        res.json(users[position]);

    } catch (error) {
        console.error(error);
        
        return res.status(500).send({
            error: "Server error. The user information could not be retrieved."
        });
    }
});


// Delete a user by id

app.delete("/api/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const position = users.findIndex(user => user.id === id);
        let deletedUser = {};

        if (position === -1) {
            res.status(404).send({
                error: "User doesn't exist"
            });
        }
        
        deletedUser = users[position];

        users = users.filter(user => user.id !== id);
        
        res.json(deletedUser);

    } catch (error) {
        console.error(error);
        
        return res.status(500).send({
            error: "Server error. The user information could not be retrieved."
        });
    }
});


// Edit user

app.put("/api/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const receivedData = req.body;
        const position = users.findIndex(user => user.id === id);
        let editedUser = {};

        if (position === -1) {
            res.status(404).send({
                error: "User doesn't exist"
            });
        }

        if (receivedData.name !== undefined) {
            editedUser.name = receivedData.name;
        }
        
        if (receivedData.bio !== undefined) {
            editedUser.bio = receivedData.bio;
        }

        Object.assign(users[position], editedUser);
        
        res.json(users[position]);

    } catch (error) {
        console.error(error);
        
        return res.status(500).send({
            error: "Server error. The user information could not be edited."
        });
    }
});


app.listen(process.env.PORT, () => {
    console.log("Server is running...");
});