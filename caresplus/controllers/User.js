const { currentUser } = require("../../db/middleware/auth");
const Pharmacist = require("../models/pharmacist");

const updateProfile = async (req, res) => {
    try{
        const { firstName, lastName, password, phone, image,  country, city, license, dob, identificationNumber, street, registrationDocument } = req.body;

        console.log();
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

module.exports = { updateProfile };