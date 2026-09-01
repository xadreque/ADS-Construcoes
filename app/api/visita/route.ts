import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

export async function POST() {
  if (!redis) {
    return NextResponse.json({ ok: true, contado: false });
  }

  try {
    const hoje = new Date().toISOString().slice(0, 10); // AAAA-MM-DD
    await redis.incr("visitas:total");
    await redis.incr(`visitas:dia:${hoje}`);
    return NextResponse.json({ ok: true, contado: true });
  } catch (erro) {
    console.error("Erro ao registar visita:", erro);
    return NextResponse.json({ ok: true, contado: false });
  }
}
