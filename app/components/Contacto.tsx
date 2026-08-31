import styles from "./Contacto.module.css";
import { FormularioContacto } from "./FormularioContacto";

// Contactos reais do negócio.
const WHATSAPP_NUMERO = "258847775566";
const TELEFONE_EXIBIDO = "+258 84 777 5566";
const EMAIL = "sithoyada@gmail.com";

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
                <a href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {TELEFONE_EXIBIDO}
                </a>
              </li>
              <li>
                <a href={`tel:${WHATSAPP_NUMERO}`}>Chamada: {TELEFONE_EXIBIDO}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>
          <FormularioContacto />
        </div>
      </div>
    </section>
  );
}
