import {
  ABOUT_ITEMS,
  CATEGORIES,
  MANAGEMENT_ITEMS,
} from "@/config/constant/menuConstant";
import { InputSearch } from "@/shared/lib/input/input";
import styles from "@/styles/baseLayout.module.css";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import {
  MdMenu,
  MdNotifications,
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
} from "react-icons/md";

const Navbar = () => {
  const handleSearch = (value: any) => {
    console.log("value", value);
  };

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
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <IconButton
          className={styles.menuIcon}
          aria-label="menu"
          size="large"
          onClick={toggleDrawer(true)}
        >
          <MdMenu style={{ color: "white", transform: "scale(1.5)" }} />
        </IconButton>
      </div>

      <img src="/assets/logo/logo.png" alt="Logo" className={styles.logo} />

      <div className={styles.rightSection}>
        <div className={styles.icons}>
          <IconButton aria-label="notifications" size="medium">
            <MdNotifications
              style={{ color: "white", transform: "scale(1.5)" }}
            />
          </IconButton>

          <IconButton aria-label="account" size="medium">
            <MdOutlineAccountCircle
              style={{ color: "white", transform: "scale(1.5)" }}
            />
          </IconButton>

          <IconButton aria-label="shop" size="medium">
            <MdOutlineShoppingCart
              style={{ color: "white", transform: "scale(1.5)" }}
            />
          </IconButton>
        </div>
        <InputSearch
          class={styles.searchInput}
          label={"Pesquisar..."}
          onChange={handleSearch}
        />
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
            {ABOUT_ITEMS.map((item) => (
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
                ></div>
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
  );
};

export default Navbar;
