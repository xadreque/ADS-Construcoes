import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !REGEX_EMAIL.test(email)) {
      return NextResponse.json({ erro: "E-mail inválido." }, { status: 400 });
    }

    if (!redis) {
      console.warn("Upstash Redis não configurado — subscrição não foi persistida.");
      return NextResponse.json({ ok: true, guardado: false });
    }

    // Um "set" evita duplicados automaticamente.
    await redis.sadd("newsletter:emails", email.toLowerCase().trim());

    return NextResponse.json({ ok: true, guardado: true });
  } catch (erro) {
    console.error("Erro ao processar subscrição de newsletter:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
