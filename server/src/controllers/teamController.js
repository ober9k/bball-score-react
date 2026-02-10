const {sleep} = require("../utils/sleep");

exports.getTeams = async (req, res) => {
    await sleep(1000);

    res.status(200).json({
       teams: [],
    });
}
