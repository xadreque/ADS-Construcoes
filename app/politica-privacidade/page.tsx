import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "../dicas/dicas.module.css";
import { URL_SITE, NOME_EMPRESA, EMAIL_CONTACTO } from "../lib/site-config";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${NOME_EMPRESA}`,
  description: "Como tratamos os dados pessoais recolhidos através deste site.",
  alternates: { canonical: `${URL_SITE}/politica-privacidade` },
  robots: { index: false, follow: true },
};

export default function PaginaPrivacidade() {
  return (
    <>
      <Header />
      <main>
        <article className={`envolvente ${styles.artigo}`}>
          <h1>Política de Privacidade</h1>
          <p>Última actualização: Fevereiro de 2026.</p>

          <p>
            Esta página explica que dados pessoais o site da {NOME_EMPRESA} recolhe,
            para que servem e como são guardados.
          </p>

          <p><strong>Que dados recolhemos</strong></p>
          <p>
            Quando preenches o formulário de orçamento, guardamos o nome, o número de
            telefone/WhatsApp, o tipo de serviço pedido e a mensagem que escreveres. Se
            subscreveres a newsletter, guardamos apenas o endereço de e-mail.
          </p>

          <p><strong>Para que usamos estes dados</strong></p>
          <p>
            Usamos os dados do formulário exclusivamente para responder ao teu pedido de
            orçamento e entrar em contacto contigo sobre o serviço pedido. O e-mail da
            newsletter é usado apenas para enviar dicas e promoções ocasionais — podes
            pedir para ser removido a qualquer momento.
          </p>

          <p><strong>Onde ficam guardados</strong></p>
          <p>
            Os dados ficam guardados numa base de dados Redis alojada pela Upstash, um
            fornecedor de infra-estrutura que actua apenas como processador técnico —
            não usa os teus dados para nenhum outro fim.
          </p>

          <p><strong>Partilha com terceiros</strong></p>
          <p>
            Não vendemos nem partilhamos os teus dados com terceiros para fins de
            marketing. Os dados só são usados internamente pela {NOME_EMPRESA}.
          </p>

          <p><strong>Os teus direitos</strong></p>
          <p>
            Podes pedir a qualquer momento para consultar, corrigir ou apagar os dados
            que temos sobre ti, escrevendo para{" "}
            <a href={`mailto:${EMAIL_CONTACTO}`}>{EMAIL_CONTACTO}</a>.
          </p>

          <p><strong>Alterações a esta política</strong></p>
          <p>
            Esta política pode ser actualizada ocasionalmente. A data no topo desta
            página indica a versão mais recente.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
