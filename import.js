'use strict';

const {MongoClient} = require('mongodb');

async function insertOne(client, element){
    const result = await client.db("opa").
                         collection("kierunki")
                         .insertOne(element);
    console.log(`${result.insertedId}`);
}

async function main(){
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const fs = require('fs');
        var rawdata = fs.readFileSync('kierunki.json');
        console.log(rawdata);
        var kierunki = JSON.parse(rawdata);
        console.log(kierunki)
        kierunki.forEach(element => {
            insertOne(client, element);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);