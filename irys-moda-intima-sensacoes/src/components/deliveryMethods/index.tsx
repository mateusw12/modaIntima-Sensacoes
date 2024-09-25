import styles from "@/styles/deliveryMethod.module.css";

const DeliveryMethod = () => {
  return (
    <>
      <div className={styles.deliveryContainer}>
        <p>
          ✨ Seu pacotinho de carinho e delicadeza pode chegar até você de
          formas super especiais:
        </p>
        <p>
          <strong>📍 Ponto de Retirada</strong>
        </p>
        <p>
          Nosso cantinho em Jaraguá do Sul está de portas abertas das 08h às
          17h, de Segunda a Sexta. A Casa Irys Moda Íntima & Sensações é o lugar
          onde suas comprinhas cheias de amor esperam por você. 💖
          <strong>
            Assim que seu pedido estiver prontinho, a gente te avisa para você
            vir buscar sua caixinha de alegria!
          </strong>
        </p>
        <p>
          <strong>📦 Correios</strong>
        </p>
        <p>
          A gente envia suas comprinhas com todo cuidado para qualquer cantinho
          do Brasil pelos Correios. 🛫 Lembrando que a entrega acontece em
          horário comercial, então precisa ter alguém para receber esses mimos
          especiais! ✨
        </p>
        <p>
          <strong>
            ❓ Qualquer dúvida, chama a gente no WhatsApp, tá bem? 💬
          </strong>
        </p>
      </div>
    </>
  );
};

export default DeliveryMethod;
