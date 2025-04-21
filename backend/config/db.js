const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');
dotenv.config();

const {
  MONGO_USER_PROSHOP: user,
  MONGO_PASSWORD_PROSHOP: password,
  MONGO_DBNAME_PROSHOP: db,
  MONGO_CLUSTER_URL_PROSHOP: clusterUrl,
} = process.env;

const uri = `mongodb+srv://ganavi:ganavi16@cluster0.0b9yh.mongodb.net/ganavi?retryWrites=true&w=majority`;


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
