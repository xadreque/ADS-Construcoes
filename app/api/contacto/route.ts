import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { EMAIL_NOTIFICACOES, NOME_EMPRESA } from "../../lib/site-config";

// Lê as credenciais do Upstash Redis das variáveis de ambiente da Vercel.
// Configura-as em: Vercel → Project → Settings → Environment Variables
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

// Notificação por e-mail via Resend — precisa de RESEND_API_KEY.
// Cria uma conta grátis em https://resend.com (100 e-mails/dia grátis).
// Enquanto não verificares o teu próprio domínio lá, usa o remetente de
// testes "onboarding@resend.dev" (já funciona, só não parece tão profissional).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const EMAIL_REMETENTE = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const LIMITE_PEDIDOS_POR_HORA = 5;

async function notificarPorEmail(dados: {
  nome: string;
  contacto: string;
  tipoServico: string | null;
  mensagem: string | null;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY não configurada — notificação por e-mail não foi enviada.");
    return;
  }
  try {
    await resend.emails.send({
      from: `${NOME_EMPRESA} <${EMAIL_REMETENTE}>`,
      to: EMAIL_NOTIFICACOES,
      subject: `Novo pedido de orçamento — ${dados.nome}`,
      text:
        `Nome: ${dados.nome}\n` +
        `Contacto: ${dados.contacto}\n` +
        `Tipo de trabalho: ${dados.tipoServico ?? "não indicado"}\n` +
        `Mensagem: ${dados.mensagem ?? "(sem detalhes adicionais)"}\n`,
    });
  } catch (erro) {
    // Uma falha no e-mail nunca deve impedir o pedido de ser guardado/aceite.
    console.error("Erro ao enviar notificação por e-mail:", erro);
  }
}

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
      await notificarPorEmail({ nome, contacto, tipoServico: tipoServico ?? null, mensagem: mensagem ?? null });
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

    // Não bloqueia a resposta ao visitante à espera do e-mail — dispara e segue.
    notificarPorEmail({ nome, contacto, tipoServico: tipoServico ?? null, mensagem: mensagem ?? null });

    return NextResponse.json({ ok: true, guardado: true });
  } catch (erro) {
    console.error("Erro ao processar pedido de contacto:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
