import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

function mergeProgress(server: any, client: any) {
  if (!server) return client;
  if (!client) return server;

  return {
    totalXP: Math.max(server.totalXP || 0, client.totalXP || 0),
    totalCoins: Math.max(server.totalCoins || 0, client.totalCoins || 0),
    challengesCompleted: Math.max(
      server.challengesCompleted || 0,
      client.challengesCompleted || 0
    ),
    badges: [...new Set([...(server.badges || []), ...(client.badges || [])])],
    categoryHistory: {
      move: Math.max(server.categoryHistory?.move || 0, client.categoryHistory?.move || 0),
      brain: Math.max(server.categoryHistory?.brain || 0, client.categoryHistory?.brain || 0),
      chill: Math.max(server.categoryHistory?.chill || 0, client.categoryHistory?.chill || 0),
    },
    bingoCard: client.bingoCard || server.bingoCard,
    bingoWeekStart: client.bingoWeekStart || server.bingoWeekStart,
    weekStreak: Math.max(server.weekStreak || 0, client.weekStreak || 0),
    lastPlayDate: [server.lastPlayDate, client.lastPlayDate]
      .filter(Boolean)
      .sort()
      .pop() || null,
    bossCompleted: Math.max(server.bossCompleted || 0, client.bossCompleted || 0),
    bingoLines: Math.max(server.bingoLines || 0, client.bingoLines || 0),
    bingoBlackouts: Math.max(server.bingoBlackouts || 0, client.bingoBlackouts || 0),
    dayStreak: Math.max(server.dayStreak || 0, client.dayStreak || 0),
    lastUpdated: new Date().toISOString(),
  };
}

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

    const store = getStore("player-progress");
    const serverState = await store.get(uid, { type: "json" });
    const clientState = await req.json();

    const merged = mergeProgress(serverState, clientState.progress);
    await store.setJSON(uid, merged);

    return new Response(JSON.stringify(merged), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Sync failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
