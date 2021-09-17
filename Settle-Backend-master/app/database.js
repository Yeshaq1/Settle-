const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
      auth: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      },
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('DB connected successfully');
  } catch (error) {
    console.error(error);
  }
}