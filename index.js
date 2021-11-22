const express = require('express')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;

//user : mydbuser1
//password: 6FX4jadT6yO8fpGn

//user : mydbuser
//password: JY6qvQYttl7NzLek

const uri = "mongodb+srv://mydbuser:JY6qvQYttl7NzLek@cluster0.imkxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

        //get API
        //all data loading
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({})
            const users = await cursor.toArray()
            res.send(users)

        })

        //specefic data loading 
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('load users with id ', id)
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.findOne(query)
            // console.log(result)
            res.send(result)
        })
        //POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            // console.log('hitting the post', req.body)
            res.json(result)

        })

        //update API
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id
            console.log('updating user', id)
            console.log(req.body)
            const updatedUser = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );

            res.json(result)

        })

        //delete API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)

            console.log('deleting user with id', id)
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