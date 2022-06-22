const Pharmacist = require('../pharmacist');
const Outlet = require('../outlet');
const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync('74582418', 10);
const pharmacists = [
    {
        firstName: "Jotham",
        lastName: "Pharmacist",
        email: "jothamntekim@gmail.com",
        password: hash,
        role: "62ae33752409ba2acdc06336"
    },
    {
        firstName: "Patient",
        lastName: "Vicerant",
        email: "jothamweb@gmail.com",
        password: hash,
        role: "62ae33752409ba2acdc06331"
    },
    {
        firstName: "Admin",
        lastName: "Vicerant",
        email: "switzdigital@gmail.com",
        password: hash,
        role: "62ae33752409ba2acdc06333"
    },
    {
        firstName: "Assistant",
        lastName: "Vicerant",
        email: "assistant@gmail.com",
        password: hash,
        role: "62ae33752409ba2acdc06332"
    },
    {
        firstName: "Employee",
        lastName: "Vicerant",
        email: "employee@gmail.com",
        password: hash,
        role: "62ae33752409ba2acdc06335"
    },
    {
        firstName: "Manager",
        lastName: "Vicerant",
        email: "manager@gmail.com",
        password: hash,
        role: "62ae33752409ba2acdc06334"
    }
];

exports.seedRoles = async () => {
        try{
            let pharmacistData = [];
            // Loop through the pharmacists array
            for(i = 0; i < pharmacists.length; i++) {
                let email = pharmacists[i].email;
                // check if the email from each pharmacist object already exists
                // if yes, store in pharmacistData
                pharmacistData = await Pharmacist.find({email});
            };
            /*
             * check the number of items in pharmacistData array
             * if 0, then loop through the pharmacists array and seed them, else already exists
             */
            if(pharmacistData.length == 0) {
                    pharmacists.forEach(async (data) => {
                        await Pharmacist.create(data)
                        .then(async (pharm) => {
                                await Outlet.create({
                                    'name': pharm.firstName,
                                })
                                .then((outlet) => {
                                    outlet.Pharmacist.push(pharm._id);
                                    outlet.save();
                                    pharm.outlets.push(outlet._id);
                                    pharm.save();
                                    console.log("Pharmacists seeded succesfully");
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        });
                }else{
                    console.log("Pharmacist already exist");
                }  
        }catch (error) {
            console.log(error);
        }     
}
