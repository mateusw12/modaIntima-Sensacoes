import styles from "@/styles/policyAndPrivacy.module.css";

const PolicyAndPrivacy = () => {
  return (
    <div>
      <div className={styles.policyContainer}>
        <h1 className={styles.title}>Política de Privacidade</h1>
        <p className={styles.intro}>
          Bem-vindo à Irys Moda Íntima e Sensações. A sua privacidade é muito
          importante para nós, e estamos comprometidos em proteger suas
          informações pessoais. Esta política de privacidade explica como
          coletamos, usamos e protegemos os dados dos nossos usuários.
        </p>

        <h2 className={styles.subtitle}>1. Coleta de Informações</h2>
        <p className={styles.text}>
          Coletamos informações pessoais que você nos fornece voluntariamente ao
          se cadastrar, comprar produtos, assinar nossa newsletter ou participar
          de promoções. As informações coletadas podem incluir, mas não estão
          limitadas a: nome, endereço de e-mail, telefone, endereço de entrega e
          dados de pagamento.
        </p>

        <h2 className={styles.subtitle}>2. Uso das Informações</h2>
        <p className={styles.text}>
          As informações coletadas são utilizadas para:
          <ul className={styles.list}>
            <li>
              Processar suas compras e garantir a entrega correta dos produtos;
            </li>
            <li>
              Enviar atualizações sobre nossos produtos, promoções e novidades;
            </li>
            <li>Melhorar sua experiência de navegação em nosso site;</li>
            <li>Proteger nossa loja contra fraudes.</li>
          </ul>
        </p>

        <h2 className={styles.subtitle}>3. Compartilhamento de Informações</h2>
        <p className={styles.text}>
          Não compartilhamos suas informações pessoais com terceiros, exceto
          quando necessário para processar sua compra (por exemplo, empresas de
          pagamento e entrega) ou quando exigido por lei.
        </p>

        <h2 className={styles.subtitle}>4. Segurança dos Dados</h2>
        <p className={styles.text}>
          Implementamos medidas de segurança técnicas e organizacionais para
          proteger suas informações contra o acesso não autorizado, alteração ou
          destruição. No entanto, nenhuma transmissão de dados pela internet é
          completamente segura, e não podemos garantir a segurança absoluta.
        </p>

        <h2 className={styles.subtitle}>5. Seus Direitos</h2>
        <p className={styles.text}>
          Você tem o direito de acessar, corrigir ou excluir suas informações
          pessoais a qualquer momento. Para isso, entre em contato com nosso
          atendimento.
        </p>

        <h2 className={styles.subtitle}>6. Alterações nesta Política</h2>
        <p className={styles.text}>
          Podemos atualizar esta Política de Privacidade periodicamente.
          Recomendamos que você revise esta página regularmente para estar
          ciente de quaisquer mudanças.
        </p>

        <p className={styles.footer}>
          Se você tiver dúvidas sobre nossa Política de Privacidade, entre em
          contato conosco através do e-mail: contato@irysmodaintima.com.
        </p>
      </div>
    </div>
  );
};

export default PolicyAndPrivacy;
