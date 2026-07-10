const express = require("express");
const cors = require ("cors");
const fs = require("fs");
const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("Hello my backend is working");
});

app.get("/api/tasks", function(req, res) {
    const data = fs.readFileSync("tasks.json");
    const tasks = JSON.parse(data);
    res.json(tasks);
});

app.post("/api/tasks", function(req, res) {
    const data = fs.readFileSync("tasks.json");
    const tasks = JSON.parse(data);
    tasks.push(req.body.task);
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));

    res.json(tasks);
});

app.listen(PORT, function() {
    console.log("Server running at http://localhost:" + PORT);
});

