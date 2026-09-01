// Configuração central — muda aqui e propaga a todo o site (SEO, footer,
// formulários, botão de WhatsApp). Evita teres de editar o mesmo dado em
// vários ficheiros.

// Domínio ainda por comprar — troca assim que tiveres o definitivo.
export const URL_SITE = "https://adsconstrucoes.co.mz";

export const NOME_EMPRESA = "ADS - Construções, Lda";
export const NOME_CURTO = "ADS - Construções";

export const WHATSAPP_NUMERO = "258847775566";
export const TELEFONE_EXIBIDO = "+258 84 777 5566";

// E-mail mostrado publicamente no site (rodapé, página de contacto,
// Política de Privacidade, Termos e Condições).
export const EMAIL_CONTACTO = "sithoyada@adscontrucoes.co.mz";

// E-mail interno que recebe a notificação de cada pedido de orçamento
// (via Resend) — por enquanto diferente do e-mail público, enquanto a
// caixa de correio definitiva não está a ser monitorizada activamente.
export const EMAIL_NOTIFICACOES = "tecnicozanda@gmail.com";

export const CIDADE = "Maputo";
export const PAIS = "Moçambique";
export const AREA_SERVICO = "Maputo e arredores";

// Mesmo identificador em todo o lado (domínio, e-mail, redes) — cria as
// contas com este nome para os links já funcionarem sem editar o código.
export const REDES_SOCIAIS = [
  { nome: "Facebook", href: "https://facebook.com/adsconstrucoes" },
  { nome: "Instagram", href: "https://instagram.com/adsconstrucoes" },
  { nome: "LinkedIn", href: "https://linkedin.com/company/adsconstrucoes" },
];

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}
