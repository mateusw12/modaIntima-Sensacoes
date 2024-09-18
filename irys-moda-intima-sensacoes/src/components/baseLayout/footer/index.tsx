import styles from "@/styles/baseLayout.module.css";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <h4>Atendimento</h4>
          <p>
            <div className={styles.alignIconItems}>
              <MdPhone size={20} /> (11) 1234-5678
            </div>
          </p>
          <p>
            <div className={styles.alignIconItems}>
              <MdEmail size={20} /> contato@irysmoda.com.br
            </div>
          </p>
        </div>

        <div className={styles.footerColumnInsitut}>
          <div className={styles.footerColumnAlignColumn}>
            <h4>Institucional</h4>

            <p>Sobre Nós</p>
            <p>Atendimento</p>
            <p>Formas de Entrega</p>
            <p>Dúvidas Frequentes</p>
            <p>Pagamentos</p>
            <p>Política de Privacidade</p>
          </div>
        </div>

        <div
          className={`${styles.footerColumn}`}
          style={{ textAlign: "right" }}
        >
          <h4>Compra Segura</h4>
          <p></p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <FaInstagram size={38} className={styles.instagramIcon} />
      </div>

      <p className={styles.copyrightText}>
        &copy; 2024 Irys Moda Íntima & Sensações. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
