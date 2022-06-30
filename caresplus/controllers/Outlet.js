const Outlet = require('../models/outlet');

let getAllOutlets = async (req, res) => {
    try {
        await Outlet.find((err, data) => {
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

let updateOutlet = async (req, res) => {
    try {
        const { name, desc, country, state, city, street, logo, registrationDocument } = req.body;

        let id = req.params.id;
        await Outlet.findById(id)
        .then(
            (outlet) => {
                outlet.name = name;
                outlet.desc = desc;
                outlet.business.registrationDocument = registrationDocument; 
                outlet.business.logo = logo;
                outlet.address.country = country;
                outlet.address.state = state;
                outlet.address.city = city;
                outlet.address.street = street;
                outlet.save();
                res.status(201).json({
                    message: "Outlet Updated Successfully",
                    data: outlet
                });
            }
        ).catch(() => {
            res.status(401).json({
                message: "Outlet with this ID does not exist!",
            });
        })
    } catch (error) {
        res.status(400).json({
            error: "Invalid request"
        });
    }
}

let getOutletById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id)
            return res.status(400).send("Outlet Id is required");

        await Outlet.findById(id)
        .then((outlet) => {
            res.status(200).json({
                data: {
                    outlet
                }
            });
        }).catch(() => {
            res.status(401).json({
                message: "Outlet with this ID does not exist!",
            });
        });
    } catch (error) {
        res.status(400).json({
            error: "Invalid request"
        });
    }
}

let deleteOutlet = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id)
            return res.status(400).send("Outlet Id is required");

        await Outlet.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send("Outlet deleted successfully");
        }).catch((err) => {
            res.status(401).json({
                message: "Outlet with this ID does not exist!",
                err: err
            });
        });
    } catch (error) {
        res.status(400).json({
            error: "Invalid request"
        });
    }
}

module.exports = { getAllOutlets, updateOutlet, getOutletById, deleteOutlet };