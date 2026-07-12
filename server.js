const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 3000;

const supabaseUrl = "https://sahgjtudozvxcwonqvwc.supabase.co";
const supabaseKey = "sb_publishable_lqur-pU4RfgFR2k-Zj07Og_Y0G69ecV";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("Hello my backend is working");
});

app.get("/api/tasks", async function(req, res) {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

app.post("/api/tasks", async function(req, res) {
    const { data, error } = await supabase
        .from("tasks")
        .insert([{ task: req.body.task }])
        .select();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

app.listen(PORT, function() {
    console.log("Server running at http://localhost:" + PORT);
});