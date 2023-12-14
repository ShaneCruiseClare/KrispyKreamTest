export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')
  const secondpass = searchParams.get('secondpass')
  const address = searchParams.get('address')
  const phone = searchParams.get('phone')
  
  console.log(email);
  console.log(pass);
  console.log(secondpass);
  console.log(address);
  console.log(phone);

  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const hash = bcrypt.hashSync(pass, saltRounds);
 

  // database call goes here

  const { MongoClient } = require('mongodb');
  const url = 'mongodb+srv://b00147191:Riolu694200@cluster0.h17pemq.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'app'; // database name
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name
  const findResult = await collection.insertOne({"username": email, "pass":
  hash, "secondpass": hash, "address": address, "phone": phone});



  
  // at the end of the process we need to send something back.
  return Response.json({ "data":"valid" })
}

