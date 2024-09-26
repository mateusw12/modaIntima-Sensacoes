import styles from "@/styles/baseLayout.module.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import {
  MdMenu,
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import Image from "next/image";
import CustomLink from "@/shared/lib/link";
import SiderBar from "../siderBar";

const Navbar = () => {
  const [toogleDrwaer, setToogleDraer] = useState<boolean>(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navColumnMenu}>
            <IconButton
              className={styles.menuIcon}
              aria-label="menu"
              size="large"
              onClick={() => setToogleDraer(true)}
            >
              <MdMenu className={styles.iconStyle} />
            </IconButton>
          </div>

          <div className={styles.navColumnLogo}>
            <CustomLink href={"/"}>
              <Image
                className={styles.logo}
                src="/assets/logo/logo.png"
                alt="Logo"
                width={200}
                height={200}
              />
            </CustomLink>
          </div>

          <div className={styles.navColumnIconSearch}>
            <div className={styles.icons}>
              <IconButton
                aria-label="account"
                size="medium"
                className={styles.myAccount}
              >
                <MdOutlineAccountCircle className={styles.iconStyle} />
                <p className={styles.myAccountLabel}> Minha Conta</p>
              </IconButton>

              <IconButton aria-label="shop" size="medium">
                <MdOutlineShoppingCart className={styles.iconStyleShop} />
              </IconButton>
            </div>
          </div>
        </div>

        <SiderBar
          openSider={toogleDrwaer}
          closeDrawer={() => setToogleDraer(false)}
        />
      </nav>
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position={"start"}>
                {
                  <>
                    <MdSearch />
                  </>
                }
              </InputAdornment>
            ),
          },
        }}
        size="medium"
        placeholder="Pesquisar..."
      />
    </>
  );
};

export default Navbar;
