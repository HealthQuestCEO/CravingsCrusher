import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, _context: Context) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const payload = JSON.parse(atob(idToken.split(".")[1]));
    const uid = payload.sub || payload.user_id;

    const store = getStore("player-progress");
    const progress = await store.get(uid, { type: "json" });

    return new Response(JSON.stringify(progress || null), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify(null), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
