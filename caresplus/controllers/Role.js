const Role = require('../../models/role');

let getAllRoles = async (req, res) => {
    try {
        await Role.find((err, data) => {
            if(err)
                res.status(500).send(err);

            res.status(200).json({data});
        });
    } catch (error) {
        res.status(400).json({
            error: "Invalid request"
        });
    }
}

module.exports = {getAllRoles};