// const { currentUser } = require("../../db/middleware/auth");
const Pharmacist = require("../models/pharmacist");
const jwt = require("jsonwebtoken");

const updateProfile = async (req, res) => {
    try{
        const { firstName, lastName, phone, image,  country, state, city, license, dob, identificationNumber, street } = req.body;

        let id = req.params.id;
        await Pharmacist.findById(id)
        .then(
            (pharmacist) => {
                pharmacist.firstName = firstName;
                pharmacist.lastName = lastName;
                pharmacist.phone = phone;
                pharmacist.photo = image;
                pharmacist.license = license; 
                pharmacist.dob = dob;
                pharmacist.identificationNumber = identificationNumber;
                pharmacist.address.country = country;
                pharmacist.address.state = state;
                pharmacist.address.city = city;
                pharmacist.address.street = street;
                pharmacist.save();
                res.status(201).json({
                    message: "Profile Updated successfully",
                    Profile: pharmacist
                });
            }
        ).catch(() => {
            res.status(401).json({
                message: "Pharmacist with this ID does not exist!",
            });
        })
    } catch(error) {
        res.status(400).json({
            error: "Invalid request"
        })
    }
}

const loggedInPharmacist = async (req, res) => {
    try {
            const token = req.headers.authorization.split(' ')[1];
            if (token)
            {
                let decodedToken = jwt.verify(token, process.env.JWT_KEY)
                const userId = decodedToken._id;
                if(req.body.userId && req.body.userId !== userId)
                {
                    res.status(404).send("User with that ID not found")
                }
                    await Pharmacist.findById(userId)
                    .then((pharm) => {
                        res.status(200).json({
                            User: pharm
                        });
                    }).catch((err) => {
                        res.status(400).send(err);
                    });
            }
            res.status(400).send('No Token Found!');
    } catch (err) {
        if (err) throw new Error(err);
    }
    
    
}

const getAllPharmacist = async (req, res) => {
    try {
        await Pharmacist.find((err, data) => {
            if(err)
                res.status(500).send(err);

            res.status(200).json({data});
        })
    } catch (error) {
        res.status(400).json({
            error: "Invalid request"
        });
    }
}

const deactivatePharmacist = async (req, res) => {
   try {
        const id  = req.params.id;
        if (!id)
            res.status(400).send("Id is required");

        await Pharmacist.findById(id)
        .then((pharm) => {
                pharm.status = 0;
                pharm.save();
                res.status(200).json({
                    message: "Pharmacist deactivated",
                    data: pharm
                });
        }).catch(() => {
            res.status(401).json({
                message: "Pharmacist with this ID does not exist!"
            });
        })
   } catch (error) {
        res.status(400).json({
            error: "Invalid request"
        });
   }
}

module.exports = { updateProfile, loggedInPharmacist, deactivatePharmacist, getAllPharmacist };
