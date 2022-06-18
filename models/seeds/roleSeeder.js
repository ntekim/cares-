const Role = require('../role');
const roles = [
    {
        name: 'Patient',
        description: 'Patient'
    },
    {
        name: 'Assistant',
        description: 'Patient trustee/assistant - have access to patient health info'
    },
    {
        name: 'Admin',
        description: "Platform  facilitator"
    },
    {
        name: 'Manager',
        description: 'Outlet Manager'
    },
    {
        name: 'Employee',
        description: "Employee of a particular outlet"
    },
    {
        name: 'Pharmacist',
        description: 'Pharmacist'
    }
];

exports.seedRoles = async () => {
    await Role.deleteMany({})
    .then(() => {
        Role.insertMany(roles);
        console.log("Roles seeded successfully");
    }).catch(
        (error) => {
            console.log(error);
        } 
    );
}

// module.exports = seedRoles;