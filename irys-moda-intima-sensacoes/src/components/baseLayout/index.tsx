import Footer from "./footer";
import Navbar from "./navbar";
import styles from "@/styles/baseLayout.module.css";
import Header from "./header";

export const BaseLayout = (props: any) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Navbar />
      <div className={styles.main}>
       {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
