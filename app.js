
const { MongoClient } = require('mongodb')

const { argv } = process

const page = argv[2]
const pageLimit = 3

const dbName = 'myBase'
const collectionName = 'lista'

const mongoUrl = 'mongodb://localhost:27017'

async function insertTestDocuments(collection){

    await collection.insertMany([

        {collection:1, date: new Date() },
        {collection:2, date: new Date() },
        {collection:3, date: new Date() },
        {collection:4, date: new Date() },
        {collection:5, date: new Date() },
        {collection:6, date: new Date() },
        {collection:7, date: new Date() },
        {collection:8, date: new Date() }


    ])

}



async function main(){

    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })

    const db = client.db(dbName)

    const collection = db.collection(collectionName)

    await insertTestDocuments(collection)

    const data = await collection.find({}, { limit:pageLimit,skip:(page-1) * pageLimit}).toArray()

    console.log(`Page ${page}:`)
    console.log(data)

    client.close()
}


main()
