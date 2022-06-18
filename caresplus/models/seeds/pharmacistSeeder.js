const Pharmacist = require('../pharmacist');
const Outlet = require('../outlet');
const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync('74582418', 10);
const pharmacist = {
        firstName: "Jotham",
        lastName: "Vicerant",
        pharmacyName: "Delsuth",
        email: "jothamntekim@gmail.com",
        password: hash,
        Role: "Pharmacist"
    };

exports.seedRoles = async () => {
    // Loop through the pharmacists array
    // Pharmacists.forEach( async (pharmacist) => {
        const email = pharmacist.email;
        // check if pharmacist already exists
        let pharmacyExist = await Pharmacist.findOne({email});
        if (!(pharmacyExist)) {
            const pharm = await Pharmacist.create(pharmacist);
            await Outlet.create({
                'name': pharmacist.firstName
            });
            // const json = JSON.stringify(pharm);
            console.log({
                "message" : "Pharmacist seeded successfully!",
                "data": pharm
            });
            
        }else{
            (error) => {
                console.log(error, "Pharmacy already exist!");
            } 
        };
        console.log(!(pharmacyExist));
    // })
    
}
