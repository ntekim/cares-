const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
// const db = mongoose();

exports.connect = () => {
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to Database!');
    console.error(error);
    process.exit(1);
});
}