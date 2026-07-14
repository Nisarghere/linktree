import { cookies } from 'next/headers'
import { editLinks } from '../lib/db'


export async function handleedit(){
        const cookieStore = await cookies()
    
       const token = cookieStore.get("session")?.value
    
       const decoded = jwt.verify(token,process.env.JWT_SECRET)
       const userid = decoded.userId
    
        
}