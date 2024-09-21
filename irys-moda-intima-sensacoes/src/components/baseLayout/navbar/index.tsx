import { CATEGORIES, MANAGEMENT_ITEMS } from "@/config/constant/menuConstant";
import styles from "@/styles/baseLayout.module.css";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  MdMenu,
  MdNotifications,
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
  MdSearch,
} from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleMouseEnter = (category: string) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navColumnMenu}>
            <IconButton
              className={styles.menuIcon}
              aria-label="menu"
              size="large"
              onClick={toggleDrawer(true)}
            >
              <MdMenu className={styles.iconStyle} />
            </IconButton>
          </div>

          <div className={styles.navColumnLogo}>
            <Image
              className={styles.logo}
              src="/assets/logo/logo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>

          <div className={styles.navColumnIconSearch}>
            <div className={styles.icons}>
              <IconButton aria-label="notifications" size="medium">
                <MdNotifications className={styles.iconStyle} />
              </IconButton>

              <IconButton aria-label="account" size="medium">
                <MdOutlineAccountCircle className={styles.iconStyle} />
              </IconButton>

              <IconButton aria-label="shop" size="medium">
                <MdOutlineShoppingCart className={styles.iconStyle} />
              </IconButton>
            </div>
          </div>
        </div>

        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={(e) => e.stopPropagation()}
          >
            <List>
              {CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className={styles.categoryContainer}
                  onMouseEnter={() => handleMouseEnter(category.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={category.title} />
                    </ListItemButton>
                  </ListItem>
                  <div
                    className={`${styles.subCategoryContainer} ${
                      activeCategory === category.title
                        ? styles.showSubCategories
                        : ""
                    }`}
                  >
                    {category.subCategories.map((subCategory) => (
                      <ListItem
                        key={subCategory}
                        disablePadding
                        className={styles.subCategoryItem}
                      >
                        <ListItemButton>
                          <ListItemText primary={subCategory} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </div>
                </div>
              ))}
            </List>
            <Divider />
            <List>
              {MANAGEMENT_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className={styles.categoryContainer}
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                  <div
                    className={`${styles.subCategoryContainer} ${
                      activeCategory === item.title
                        ? styles.showSubCategories
                        : ""
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem}
                        disablePadding
                        className={styles.subCategoryItem}
                      >
                        <ListItemButton>
                          <ListItemText primary={subItem} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </div>
                </div>
              ))}
            </List>
          </Box>
        </Drawer>
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
