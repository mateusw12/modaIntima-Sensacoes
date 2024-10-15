import styles from "@/styles/link.module.css";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean; 
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  isExternal = false, // Valor padrão como false
}) => {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.customLink}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.customLink}>
      {children}
    </Link>
  );
};

export default CustomLink;
