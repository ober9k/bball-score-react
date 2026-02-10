const {sleep} = require("../utils/sleep");

exports.getPlayers = async (req, res) => {
    await sleep(1000);

    res.status(200).json({
       players: [],
    });
}
