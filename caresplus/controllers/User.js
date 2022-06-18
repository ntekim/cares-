const { currentUser } = require("../../db/middleware/auth");
const Pharmacist = require("../models/pharmacist");

const updateProfile = async (req, res) => {
    const { firstName, lastName, businessName, password, phone, image,  country, city, displayName, pharmacistLicense, dob, identificationNumber, address, registrationDocument } = req.body;

    console.log();
        // await Pharmacist.findById({_id: req.params.id})
        // .then(
        //     (pharmacist)
        // )
    //     const profile = new Profile({
    //     firstName: firstName,
    //     lastName: lastName,
    //     businessName: businessName,
    //     password: password, 
    //     phone: phone, 
    //     image: image,  
    //     country: image, 
    //     city: city, 
    //     displayName: displayName, 
    //     pharmacistLicense: pharmacistLicense, 
    //     dob: dob, 
    //     identificationNumber: identificationNumber, 
    //     address: address, 
    //     business: {
    //         registrationDocument: registrationDocument
    //     }
    // });
}

module.exports = { updateProfile };