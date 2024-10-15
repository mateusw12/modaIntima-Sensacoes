import styles from "@/styles/baseLayout.module.css";
import { MdPhone, MdEmail } from "react-icons/md";
import CustomLink from "@/shared/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { ISocialMedia } from "@/lib/database/models/socialMedia/socialMedia";
import { IconType } from "react-icons";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const fetcher = axios.create({
  baseURL: "/api",
});

interface SocialMedia {
  icon?: IconType;
  path?: string;
}

const Footer = () => {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);

  const iconMap: Record<string, IconType> = {
    FaInstagram,
    FaFacebook,
    FaTwitter,
  };

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await fetcher.get("/socialMedia");
        const data: SocialMedia[] = [];
        for (const item of response.data as ISocialMedia[]) {
          const Icon = iconMap[item.nomeIcone];
          data.push({
            icon: Icon,
            path: item.path,
          });
        }
        setSocialMedias(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadingData();
  }, []);

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
        <div style={{ display: "flex", gap: "10px" }}>
          {socialMedias.map((socialMedia, index) => {
            const Icon = socialMedia.icon;
            return (
              <CustomLink
                href={socialMedia.path ?? ""}
                key={index}
                isExternal={true}
              >
                {Icon && <Icon className={styles.instagramIcon} />}
              </CustomLink>
            );
          })}
        </div>
      </div>

      <p className={styles.copyrightText}>
        &copy; 2024 Irys Moda Íntima & Sensações. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
