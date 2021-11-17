const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//user : mydbuser1
//password: 6FX4jadT6yO8fpGn



const uri = "mongodb+srv://mydbuser1:6FX4jadT6yO8fpGn@cluster0.imkxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Running my crud server')
})

app.listen(port, () => {
    console.log('listening to port', port)
})