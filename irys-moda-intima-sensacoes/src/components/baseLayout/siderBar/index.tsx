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
  styled,
} from "@mui/material";
import { CATEGORIES, MANAGEMENT_ITEMS } from "@/config/constant/menuConstant";
import { MdClose } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";
import CustomLink from "@/shared/link";

interface SideBarProps {
  openSider: boolean;
  closeDrawer: (toggle: boolean) => void;
}

const SiderBar = (props: SideBarProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleActiveCategory = (category: string | null) => {
    if (category === activeCategory) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Drawer
      open={props.openSider}
      onClose={() => {
        props.closeDrawer(false);
        setActiveCategory(null);
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => {
              setActiveCategory(null);
              props.closeDrawer(false);
            }}
          >
            <MdClose />
          </IconButton>
        </DrawerHeader>
        <List>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ListItem>
              <ListItemButton>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <AiOutlineHome style={{ transform: "scale(1.5)" }} /> Home
                </div>
              </ListItemButton>
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          {CATEGORIES.map((category) => (
            <div
              key={category.title}
              className={styles.categoryContainer}
              onClick={() => handleActiveCategory(category.title ?? null)}
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
                {category.subCategories &&
                  category.subCategories.map((subCategory) => (
                    <ListItem
                      key={subCategory.title}
                      disablePadding
                      className={styles.subCategoryItem}
                    >
                      <ListItemButton disabled={subCategory.disabled}>
                        <CustomLink href={subCategory.path ?? ""}>
                          <ListItemText primary={subCategory.title} />
                        </CustomLink>
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
              onClick={() => handleActiveCategory(item.title)}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
              <div
                className={`${styles.subCategoryContainer} ${
                  activeCategory === item.title ? styles.showSubCategories : ""
                }`}
              >
                {item.subCategories &&
                  item.subCategories.map((subItem) => (
                    <ListItem
                      key={subItem.title}
                      disablePadding
                      className={styles.subCategoryItem}
                    >
                      <ListItemButton disabled={subItem.disabled}>
                        <CustomLink href={subItem.path ?? ""}>
                          <ListItemText primary={subItem.title} />
                        </CustomLink>
                      </ListItemButton>
                    </ListItem>
                  ))}
              </div>
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SiderBar;
