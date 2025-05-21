
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASSWORD}@cluster0.ekpozrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://CoffeceHouseJOGno:r4jv0ux59vqgU4Zr@cluster0.ekpozrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();
        // post


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const coffeeCollection = client.db("coffeesDB").collection('coffees')

        app.get('/coffees', async (req, res) => {
            const result = await coffeeCollection.find().toArray();
            res.send(result)
        });

        app.get('/coffees/:id', async (req, res) => {

            const id = req.params.id;
            const quary = { _id: new ObjectId(id) }
            const result = await coffeeCollection.findOne(quary)
            res.send(result);
        })

        app.post('/coffees', async (req, res) => {
            const newCoffees = req.body;
            console.log('that is my new coffee', newCoffees)
            const result = await coffeeCollection.insertOne(newCoffees);
            res.send(result);
        });
        app.put('/coffees/:id', async (req, res) => {

            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const coffeeUpdateed=req.body
            const updateDoc = {
                $set: coffeeUpdateed
            };
            const result = await coffeeCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        app.delete('/coffees/:id', async (req, res) => {

            const id = req.params.id
            const quary = { _id: new ObjectId(id) }
            const result = await coffeeCollection.deleteOne(quary)
            res.send(result)
        })
    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('coffees server is on')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})