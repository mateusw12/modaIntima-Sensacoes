import Footer from "./footer";
import Navbar from "./navbar";
import styles from "@/styles/baseLayout.module.css";
import Header from "./header";

export const BaseLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Navbar />
      <div className={styles.main}>
        <div className={styles.content}>Conteúdo principal</div>
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
