// const { currentUser } = require("../../db/middleware/auth");
const Pharmacist = require("../models/pharmacist");
const jwt = require("jsonwebtoken");

const updateProfile = async (req, res) => {
    try{
        const { firstName, lastName, password, phone, image,  country, city, license, dob, identificationNumber, street, registrationDocument } = req.body;

        await Pharmacist.findById({_id: req.params.id})
        .then(
            (pharmacist) => {
                pharmacist.firstName = firstName;
                pharmacist.lastName = lastName;
                pharmacist.password = password;
                pharmacist.phone = phone;
                pharmacist.photo = image;
                pharmacist.license = license; 
                pharmacist.dob = dob; 
                pharmacist.identificationNumber = identificationNumber; 
                pharmacist.address = {
                    country: country,
                    state: state,
                    city: city,
                    street: street
                };
                pharmacist.save();
                res.status(201).json({
                    message: "Profile Updated successfully",
                    data: pharmacist
                });
            }
        ).catch((error) => {
            res.status(401).json({
                message: "Pharmacist with this ID does not exist!",
                error: error
            });
        })
    } catch(error) {
        res.status(400).json({
            error: error
        })
    }
}

const loggedInUser = async (req, res) => {
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
        res.json({
            errorMessage: 'No token found'
        });
    } catch (err) {
        if (err) throw new Error(err);
    }
    
    
}

module.exports = { updateProfile, loggedInUser };