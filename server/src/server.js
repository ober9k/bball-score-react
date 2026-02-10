const express = require("express");
const app = express();
const cors = require("cors");
const {sleep} = require("./utils/sleep");
const corsOptions = {
    origin: ["http://localhost:5173"] // todo: update to env
}

const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");

app.use(cors(corsOptions));

app.get("/api", async (req, res) => {
    await sleep(1000);
    res.json({
        home: "helloWorld",
    });
});

app.use(playerRoutes);
app.use(teamRoutes);

// todo: update to env
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
