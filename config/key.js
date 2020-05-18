require('dotenv').config();

const mongoURI = `mongodb+srv://sujaydey:${process.env.password}@cluster0-fmo3y.mongodb.net/logindetail?retryWrites=true&w=majority`;
exports.url = mongoURI;
exports.jwtkey = process.env.jwttoken;
