import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
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

    if (!uid) {
      return new Response("Invalid token", { status: 401 });
    }

    const body = await req.json();
    const store = getStore("player-progress");
    await store.setJSON(uid, {
      ...body.progress,
      lastUpdated: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Save failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
