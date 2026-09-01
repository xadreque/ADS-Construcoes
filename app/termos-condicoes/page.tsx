import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "../dicas/dicas.module.css";
import { URL_SITE, NOME_EMPRESA, EMAIL_CONTACTO } from "../lib/site-config";

export const metadata: Metadata = {
  title: `Termos e Condições | ${NOME_EMPRESA}`,
  description: "Condições gerais de prestação de serviço da " + NOME_EMPRESA + ".",
  alternates: { canonical: `${URL_SITE}/termos-condicoes` },
  robots: { index: false, follow: true },
};

// NOTA: os valores entre [colchetes] são exemplos — confirma os números
// reais da tua política (sinal, prazo de cancelamento, garantia) antes
// de publicar. Isto não substitui aconselhamento jurídico profissional.
export default function PaginaTermos() {
  return (
    <>
      <Header />
      <main>
        <article className={`envolvente ${styles.artigo}`}>
          <h1>Termos e Condições de Serviço</h1>
          <p>Última actualização: Fevereiro de 2026.</p>

          <p>
            Estas condições aplicam-se a todos os serviços de pintura, reparação e
            acabamento prestados pela {NOME_EMPRESA} ("nós"). Ao contratares um dos
            nossos serviços, aceitas os termos abaixo.
          </p>

          <p><strong>1. Orçamentos</strong></p>
          <p>
            Os orçamentos apresentados através do site (incluindo a calculadora
            instantânea) são estimativas de referência. O valor final é confirmado após
            visita ao local, tendo em conta a área exacta, o estado da superfície e os
            materiais escolhidos.
          </p>

          <p><strong>2. Pagamento</strong></p>
          <p>
            Regra geral, é pedido um sinal de [X]% do valor total no início do trabalho,
            com o saldo a ser pago na entrega. Aceitamos M-Pesa, eMola, mKesh e
            transferência bancária.
          </p>

          <p><strong>3. Prazos</strong></p>
          <p>
            O prazo estimado é acordado antes do início do trabalho. Atrasos causados por
            condições fora do nosso controlo (ex: chuva forte em trabalhos de exterior)
            serão comunicados assim que identificados.
          </p>

          <p><strong>4. Garantia</strong></p>
          <p>
            Garantimos o serviço prestado por um período a combinar consoante o tipo de
            trabalho, cobrindo defeitos de aplicação da tinta. A garantia não cobre danos
            causados por terceiros, desgaste natural ou infiltrações não identificadas no
            momento da pintura.
          </p>

          <p><strong>5. Cancelamentos</strong></p>
          <p>
            Pedimos aviso com pelo menos [X] dias de antecedência para cancelar ou
            reagendar um trabalho já confirmado, para podermos reorganizar a equipa.
          </p>

          <p><strong>6. Responsabilidades do cliente</strong></p>
          <p>
            Pedimos que objectos de valor ou frágeis sejam retirados da área de trabalho
            antes do início. Protegemos móveis e chão, mas não nos responsabilizamos por
            danos em itens que não tenham sido sinalizados ou removidos previamente.
          </p>

          <p><strong>7. Alterações a estes termos</strong></p>
          <p>
            Estes termos podem ser actualizados ocasionalmente. A data no topo desta
            página indica a versão mais recente.
          </p>

          <p><strong>Dúvidas</strong></p>
          <p>
            Para qualquer questão sobre estes termos, escreve para{" "}
            <a href={`mailto:${EMAIL_CONTACTO}`}>{EMAIL_CONTACTO}</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
