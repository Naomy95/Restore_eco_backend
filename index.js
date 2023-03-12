const express = require('express')
const app = express();  
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;            //Instantiate an express app, the main work horse of this server
const port=process.env.PORT || 5000   

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://Restore-eco:m0dI4fNF0EPMfHDJ@cluster0.mvwiu4p.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err=>{
    const collection=client.db("restore_eco").collection("user")
    console.log('connected')

})


async function run() {
    try {
        await client.connect();
        const database = client.db('restore_eco');
        const usersCollection = database.collection('user');
        const donatorCollection = database.collection('donator');
        const participatorCollection = database.collection('participator');
        
    
    // app.get('/users/', async (req, res) => {
    //     const email = req.params.email;
    //     const query = { email:email };
    //     const user = await usersCollection.findOne(query);
    //     res.send(user)
       
    // })
    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
        console.log(users)
    })
    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.json(result);
        console.log(req.body)
    })
    app.get('/donators', async (req, res) => {
        const cursor = donatorCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
        console.log(users)
    })
    app.post('/donators', async (req, res) => {
        const donator = req.body;
        const result = await donatorCollection.insertOne(donator);
        res.json(result);
        console.log(req.body)
    })
            app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            // const query = { _id: ObjectId(id) };
            // console.log(query);
            // const result = await usersCollection.deleteOne(query);
            // console.log(result);
            // res.json(result);
        })

        app.get('/participators', async (req, res) => {
            const cursor = participatorCollection.find({});
            const participators = await cursor.toArray();
            res.send(participators);
            console.log(participators)
        })
        app.post('/participators', async (req, res) => {
            const user = req.body;
            const result = await participatorCollection.insertOne(user);
            res.json(result);
            console.log(req.body)
        })
}
    finally {
        // await client.close();
    }
    }
 
    run().catch(err=>console.log(err));
    
    app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
        console.log(`Now listening on port ${port}`); 
    });