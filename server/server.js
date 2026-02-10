const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"] // todo: update to env
}

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({
        fruits: ["apply", "banana", "orange"]
    });
});

// todo: update to env
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
