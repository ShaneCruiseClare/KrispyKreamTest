import { cookies } from 'next/headers'

export async function GET(req, res) {

    // Make a note we are on
    // the api. This goes to the console.
    console.log("checking auth")

    const res2 = await fetch('http://localhost:3000/api/checkAuth’’')
    const data = await res2.json()
    // get the auth record
    let record = cookies().get('auth');
    console.log(record.value);
    
    // at the end of the process we need to send something back.
    return Response.json({ "status":"" + record.value + ""})
}
