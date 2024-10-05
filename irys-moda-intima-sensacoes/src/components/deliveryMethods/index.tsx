import styles from "@/styles/deliveryMethod.module.css";

const DeliveryMethod = () => {
  return (
    <div className={styles.container}>
      <div className={styles.deliveryContainer}>
        <h1 className={styles.title}>Formas de Entrega</h1>
        <p className={styles.text}>
          ✨ Seu pacotinho de carinho e delicadeza pode chegar até você de
          formas super especiais:
        </p>
        <p className={styles.text}>
          <strong>📍 Ponto de Retirada</strong>
        </p>
        <p className={styles.text}>
          Nosso cantinho em Jaraguá do Sul está de portas abertas das 08h às
          17h, de Segunda a Sexta. A Casa Irys Moda Íntima & Sensações é o lugar
          onde suas comprinhas cheias de amor esperam por você. 💖
          <strong>
            Assim que seu pedido estiver prontinho, a gente te avisa para você
            vir buscar sua caixinha de alegria!
          </strong>
        </p>
        <p className={styles.text}>
          <strong>📦 Correios</strong>
        </p>
        <p>
          A gente envia suas comprinhas com todo cuidado para qualquer cantinho
          do Brasil pelos Correios. 🛫 Lembrando que a entrega acontece em
          horário comercial, então precisa ter alguém para receber esses mimos
          especiais! ✨
        </p>
        <p className={styles.text}>
          <strong>
            ❓ Qualquer dúvida, chama a gente no WhatsApp, tá bem? 💬
          </strong>
        </p>
      </div>
    </div>
  );
};

export default DeliveryMethod;
