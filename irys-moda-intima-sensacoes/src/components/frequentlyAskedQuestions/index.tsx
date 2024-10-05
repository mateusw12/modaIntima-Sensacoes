import styles from "@/styles/frequentlyAskedQuestion.module.css";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MdExpandMore } from "react-icons/md";

const FrequentlyAskedQuestion = () => {
  return (
    <div className={styles.container}>
      <div className={styles.frequentlyContainer}>
        <h1 className={styles.title}>Dúvidas Frequentes</h1>

        <Accordion className={styles.accordion}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            className={styles.accordionSummary}
          >
            Onde fica o ponto de retirada?
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <p>
              Nós funcionamos das 08h às 17h, de segunda à sexta, só para
              retirar pacotinhos prontos, ok?
            </p>
            <p>
              Rua Ângelo Pradi, 55 - Apto 148 - Ilha da Figueira, Jaraguá do Sul
              - SC, 89258-556.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion className={styles.accordion}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
            className={styles.accordionSummary}
          >
            Vocês enviam para todo Brasil?
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <p>
              Simmm! 💖 Nossos pacotinhos de amor podem viajar para qualquer
              cantinho do Brasil! 📦✨ Eles chegam até você com todo carinho
              através dos Correios. Pode esperar seu pacote cheio de amor em
              casa, pronto para arrancar sorrisos! 🥰
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion className={styles.accordion}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel4-content"
            id="panel4-header"
            className={styles.accordionSummary}
          >
            Por onde faço minhas compras?
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <p>
              Nossa loja é 100% online. As compras devem ser feitas pelo nosso
              site.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestion;
