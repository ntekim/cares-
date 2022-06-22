const Category = require('../category');
const categories = [
    {
        name: 'Malaria',
    },
    {
        name: 'Anti-biotics',
    },
    {
        name: 'Anti-fungal',
    },
    {
        name: 'Contraception',
        description: 'Dunno'
    }
];

exports.seedRoles = async () => {
    try {
        let categoriesData = [];
        for(i = 0; i < categories.length; i++){
            let name = categories[i].name;
            // Check if it already exists
            categoriesData = await Category.find({name});
        }
        if(categoriesData.length == 0){
            categories.forEach(async (category) => {
                await Category.create(category)
                .then((cat) => {
                    console.log({
                        statusCode: 201,
                        message: "Categories seeded successfully",
                        categories: cat
                    });
                })
                .catch((error) => {
                    console.log({
                        statusCode: 500,
                        error: error
                    });
                })
            })
        }
        console.log("Categories already exists");
    } catch (error) {
        console.log({
            statusCode: 500,
            error: error
        });
    }
}
