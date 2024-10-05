import styles from "@/styles/paymentDescription.module.css";

const PaymentDescription = () => {
  return (
    <div className={styles.container}>
      <div className={styles.paymentDescriptionContainer}>
        <h1 className={styles.title}>Pagamentos</h1>
        <p className={styles.text}>
          Nós temos 2 opções diferentes para você realizar seu pagamento: PIX:
        </p>
        <p className={styles.text}>
          No ato da finalização de compra, um QR Code será gerado. Aponte a
          câmera e escaneie ou, copie o código. O destinatário aparecerá como
          ------. Não há necessidade de enviar o comprovante, mas caso prefira,
          encaminhe para o nosso WhatsApp: +55 62 8149-6772.
        </p>
        <p className={styles.text}>
          Aceitamos as seguintes bandeiras: Mastercard e Visa.
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default PaymentDescription;
