import styles from "@/styles/baseLayout.module.css";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import CustomLink from "@/shared/lib/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <h4>Atendimento</h4>
          <div className={styles.alignIconItems}>
            <MdPhone size={20} /> (11) 1234-5678
          </div>
          <div className={styles.alignIconItems}>
            <MdEmail size={20} /> contato@irysmoda.com.br
          </div>
        </div>

        <div className={styles.footerColumnInsitut}>
          <div className={styles.footerColumnAlignColumn}>
            <h4>Institucional</h4>

            <p>Sobre Nós</p>
            <CustomLink href={"/atendimento"}>
              <p>Atendimento</p>
            </CustomLink>
            <CustomLink href={"/formas-de-entrega"}>
              <p>Formas de Entrega</p>
            </CustomLink>
            <CustomLink href={"/duvidas-frequentes"}>
              <p>Dúvidas Frequentes</p>
            </CustomLink>
            <CustomLink href={"/pagamentos"}>
              <p>Pagamentos</p>
            </CustomLink>
            <p>
              <CustomLink href={"/termos/politica&privacidade"}>
                Política de Privacidade
              </CustomLink>
            </p>
          </div>
        </div>

        <div className={`${styles.footerColumnSecurity}`}>
          <h4>Compra Segura</h4>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.cnpj}>
          <p>CNPJ: 00.000.000/0000-00</p>
        </div>

        <FaInstagram className={styles.instagramIcon} />
      </div>

      <p className={styles.copyrightText}>
        &copy; 2024 Irys Moda Íntima & Sensações. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
