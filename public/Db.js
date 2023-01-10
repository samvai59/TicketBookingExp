const {MongoClient} = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
client.connect();
module.exports = client;