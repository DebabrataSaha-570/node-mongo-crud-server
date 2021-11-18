const express = require('express')
const cors = require('cors')

const { MongoClient } = require('mongodb');
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;

//user : mydbuser1
//password: 6FX4jadT6yO8fpGn



const uri = "mongodb+srv://mydbuser1:6FX4jadT6yO8fpGn@cluster0.imkxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// .......................using normal ways 
// client.connect(err => {
//     const collection = client.db("NewDBUser").collection("users");

//     console.log('hitting the data base')
//     console.log(err)
//     const user = { name: 'Mahiya mahi', email: 'mahi@gmail.com', phone: '018349348535' }
//     collection.insertOne(user)
//         .then(() => {
//             console.log('insert success')
//         })

//     // client.close();
// });


// ............using async await like in the node documentation. (It is recommended to use like documentation )

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("NewDBUser");
//         const usersCollection = database.collection("users");
//         // create a document to insert
//         const doc = {
//             name: "Special One",
//             email: "specail@hotmail.com",
//         }
//         const result = await usersCollection.insertOne(doc);
//         console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);

// ............

async function run() {
    try {
        await client.connect();
        const database = client.db("NewDBUser");
        const usersCollection = database.collection("users");

        //POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            // console.log('hitting the post', req.body)
            res.json(result)

        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my crud server')
})

app.listen(port, () => {
    console.log('listening to port', port)
})