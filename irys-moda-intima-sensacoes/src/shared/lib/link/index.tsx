import styles from "@/styles/link.module.css";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
}) => {
  return (
    <>
      <Link href={href} className={`${styles.customLink} `}>
        {children}
      </Link>
    </>
  );
};

export default CustomLink;
