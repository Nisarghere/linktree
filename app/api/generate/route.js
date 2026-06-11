import { createLinktree } from "@/app/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const { handle, pic, links } = body;

    console.log("RECEIVED:", body);

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

    await createLinktree(handle, pic, safeLinks);

    return Response.json({ success: true });
  } catch (err) {
    console.error("API ERROR:", err);

    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// import { createLinktree } from "@/app/lib/db"

// export async function POST(request) {
//   try {
//     const { handle, pic, links } = await request.json()

//     await createLinktree(handle, pic, links)

//     return Response.json({ success: true })

//   } catch (error) {
//   console.log("FULL ERROR:", error)
//   return Response.json({
//     success: false,
//     error: error.message,
//     stack: error.stack
//   })
// }
// }