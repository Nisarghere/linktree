import { createHandle, createLinktree } from "@/app/lib/db";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'


export async function POST(req) {
  try {
    const body = await req.json();

    const { handle, pic, links } = body;

    // console.log("RECEIVED:", body);

    // validation
    if (!handle || !pic || !Array.isArray(links)) {
      return Response.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const safeLinks = links.filter(
      (l) => l?.url?.trim() && l?.text?.trim()
    );

    if (safeLinks.length === 0) {
      return Response.json(
        { success: false, error: "No valid links" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userid = decoded.userId 
    console.log(userid)
    
    await createLinktree(userid, pic, safeLinks);
    await createHandle(handle, userid)
 
    return Response.json({ success: true
     });
  } catch (err) {
    console.error("API ERROR:", err);

    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
 