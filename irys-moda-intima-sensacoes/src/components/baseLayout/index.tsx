import Footer from "./footer";
import Navbar from "./navbar";
import styles from "@/styles/baseLayout.module.css";
import Header from "./header";

export const BaseLayout = (props: any) => {
  console.log("NEXT_PUBLIC_MONGO_URI", process.env.NEXT_PUBLIC_MONGO_URI)
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
