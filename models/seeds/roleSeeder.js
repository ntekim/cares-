const Role = require('../role');
const roles = [
    {
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
        description: 'Pharmacist'
    }
];

exports.seedRoles = async () => {
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
