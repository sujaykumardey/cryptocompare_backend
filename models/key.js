const mongoose = require('mongoose');

const keyValue = new mongoose.Schema({
  key: String,
});

const Key = mongoose.model('keys', keyValue);

module.exports = Key;
