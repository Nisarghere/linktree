import findUser from "@/app/lib/db"



export default await POST(request){
    const req = await request.json()
    const {email, password} = req

    const user = await findUser(email, password)

    const {password:_, safepasswd} = req
    return Response.json({
        message:'data received..',
        body: safepasswd

    })
}