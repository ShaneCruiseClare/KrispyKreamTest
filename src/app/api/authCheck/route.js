import { cookies } from 'next/headers'

export async function GET(req, res) {

const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://b00147191:Riolu694200@cluster0.h17pemq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app'; // database name
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collection = db.collection('login'); // collection name


// Make a note we are on
// the api. This goes to the console.
console.log("checking auth")
// get the auth record
let record = cookies().get('auth');
console.log(record.value);
// at the end of the process we need to send something back.
return Response.json({ "status":"" + record.value + ""})
}