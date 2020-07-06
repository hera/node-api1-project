const express = require("express");

const app = express();
const PORT = 8000;
const ADDRESS = "127.0.0.1";


app.listen(PORT, ADDRESS, () => {
    console.log("Server is running...");
});