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
        description: 'Pharmacy manager'
    }
];

exports.seedRoles = async () => {
    // await Category.deleteMany({})
    // .then(() => {
        await Category.insertMany(categories);
        console.log("Categories seeded successfully");
    // }).catch(
    //     (error) => {
    //         console.log(error);
    //     } 
    // );
}
