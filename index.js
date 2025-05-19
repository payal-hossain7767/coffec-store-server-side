const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

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

    } finally {

    }
}
run().catch(console.dir);

// userName:CoffeceHouseJOGno
// password:r4jv0ux59vqgU4Zr
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})