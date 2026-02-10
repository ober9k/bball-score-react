const express = require("express");
const app = express();

app.get("/api", (req, res) => {
    res.json({
        fruits: ["apply", "banana", "orange"]
    });
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});
