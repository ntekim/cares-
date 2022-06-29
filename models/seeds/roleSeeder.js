const Role = require('../role');
const roles = [
    {
<<<<<<< HEAD
        title: 'patient',
        description: 'Patient'
    },
    {
        title: 'assistant',
        description: 'Patient trustee/assistant - have access to patient health info'
    },
    {
        title: 'admin',
        description: "Platform  facilitator"
    },
    {
        title: 'manager',
        description: 'Outlet Manager'
    },
    {
        title: 'employee',
        description: "Employee of a particular outlet"
    },
    {
        title: 'pharmacist',
=======
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
>>>>>>> 220d4ea8353470919678c5527889bc6e4a3cc7d8
        description: 'Pharmacist'
    }
];

exports.seedRoles = async () => {
<<<<<<< HEAD
    try {
        let rolesData = [];
        for(i = 0; i < roles.length; i++){
            let title = roles[i].title;
            
            // check if any role already exists
            rolesData = await Role.find({title});
        }
        if(rolesData.length == 0){
            roles.forEach(async (role) => {
               Role.create(role)
               .then((rol) => {
                console.log({
                    statusCode: 201,
                    message: "Roles seeded successfully"
                });
                }).catch(
                    (error) => {
                        console.log({
                            statusCode: 500,
                            error: error
                        });
                    } 
                );
            })
        }
        console.log("Roles already exists");
    } catch (error) {
        console.log({
            statusCode: 500,
            error: error
        });
    }
    
}
=======
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
>>>>>>> 220d4ea8353470919678c5527889bc6e4a3cc7d8
