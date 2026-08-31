import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Lê as credenciais do Upstash Redis das variáveis de ambiente da Vercel.
// Configura-as em: Vercel → Project → Settings → Environment Variables
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const LIMITE_PEDIDOS_POR_HORA = 5;

export async function POST(req: NextRequest) {
  try {
    const dados = await req.json();
    const { nome, contacto, tipoServico, mensagem } = dados ?? {};

    if (!nome || !contacto) {
      return NextResponse.json({ erro: "Faltam dados obrigatórios." }, { status: 400 });
    }

    // Se o Redis ainda não estiver configurado (ex: em desenvolvimento local
    // sem .env), aceita o pedido na mesma para não bloquear os testes —
    // apenas não fica guardado.
    if (!redis) {
      console.warn("Upstash Redis não configurado — pedido não foi persistido.");
      return NextResponse.json({ ok: true, guardado: false });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
    const chaveLimite = `limite:contacto:${ip}`;
    const pedidosNaUltimaHora = await redis.incr(chaveLimite);
    if (pedidosNaUltimaHora === 1) {
      await redis.expire(chaveLimite, 60 * 60);
    }
    if (pedidosNaUltimaHora > LIMITE_PEDIDOS_POR_HORA) {
      return NextResponse.json(
        { erro: "Demasiados pedidos. Tenta novamente mais tarde ou usa o WhatsApp." },
        { status: 429 }
      );
    }

    const idPedido = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await redis.set(idPedido, {
      nome,
      contacto,
      tipoServico: tipoServico ?? null,
      mensagem: mensagem ?? null,
      ip,
      criadoEm: new Date().toISOString(),
    });
    // Mantém uma lista ordenada dos pedidos mais recentes, fácil de listar depois.
    await redis.lpush("leads:lista", idPedido);

    return NextResponse.json({ ok: true, guardado: true });
  } catch (erro) {
    console.error("Erro ao processar pedido de contacto:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
