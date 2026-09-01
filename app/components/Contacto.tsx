import styles from "./Contacto.module.css";
import { FormularioContacto } from "./FormularioContacto";

// Contactos reais do negócio.
const WHATSAPP_NUMERO = "258847775566";
const TELEFONE_EXIBIDO = "+258 84 777 5566";
const EMAIL = "sithoyada@gmail.com";

function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.02 2C6.5 2 2.03 6.44 2.03 11.92c0 1.83.5 3.55 1.36 5.03L2 22l5.2-1.36a10 10 0 0 0 4.82 1.23h.01c5.52 0 9.99-4.44 9.99-9.92C22.02 6.44 17.55 2 12.02 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.84-3.03-.2-.31a8.06 8.06 0 0 1-1.25-4.29c0-4.47 3.68-8.11 8.24-8.11 2.2 0 4.27.86 5.82 2.4a8.02 8.02 0 0 1 2.42 5.7c0 4.47-3.68 8.15-8.25 8.15Z" />
    </svg>
  );
}

function IconeTelefone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function IconeEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </svg>
  );
}

export function Contacto() {
  return (
    <section className={`secao ${styles.secao}`} id="contacto">
      <div className="envolvente">
        <div className={styles.grelha}>
          <div className={styles.coluna}>
            <h2>Vamos falar sobre a tua parede.</h2>
            <p>
              Responde ao formulário ou fala directamente connosco. Orçamento
              sem compromisso.
            </p>
            <ul className={styles.contactosDirectos}>
              <li>
                <a className={styles.contactoLinha} href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank" rel="noopener noreferrer">
                  <span className={styles.iconeContacto} data-tipo="whatsapp"><IconeWhatsApp /></span>
                  <span className={styles.contactoTexto}>
                    <small>WhatsApp</small>
                    <span>{TELEFONE_EXIBIDO}</span>
                  </span>
                </a>
              </li>
              <li>
                <a className={styles.contactoLinha} href={`tel:${WHATSAPP_NUMERO}`}>
                  <span className={styles.iconeContacto} data-tipo="telefone"><IconeTelefone /></span>
                  <span className={styles.contactoTexto}>
                    <small>Chamada</small>
                    <span>{TELEFONE_EXIBIDO}</span>
                  </span>
                </a>
              </li>
              <li>
                <a className={styles.contactoLinha} href={`mailto:${EMAIL}`}>
                  <span className={styles.iconeContacto} data-tipo="email"><IconeEmail /></span>
                  <span className={styles.contactoTexto}>
                    <small>E-mail</small>
                    <span>{EMAIL}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <FormularioContacto />
        </div>
      </div>
    </section>
  );
}
