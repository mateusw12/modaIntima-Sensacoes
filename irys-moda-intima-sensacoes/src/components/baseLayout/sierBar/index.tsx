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
import { MdMenu } from "react-icons/md";

const Sidebar = () => {
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

  const categories = [
    {
      title: "Lingeries",
      subCategories: ["Calcinhas", "Conjuntos", "Sutiãs"],
    },
    {
      title: "Roupas de Dormir",
      subCategories: ["Baby Dolls", "Pijamas", "Camisolas"],
    },
    {
      title: "Sex Shop",
      subCategories: ["Acessórios", "Cosméticos", "Brincadeiras", "Fantasias"],
    },
  ];

  const managementItems = [
    {
      title: "Cadastros",
      subItems: [
        "Produto",
        "Categoria",
        "Método de Pagamento",
        "Oferta",
        "Rede Social",
      ],
    },
    { title: "Consultas", subItems: ["Produtos", "Pedidos", "Ofertas"] },
  ];

  return (
    <aside className={styles.sidebar}>
      <IconButton
        className={styles.menuIcon}
        aria-label="menu"
        size="large"
        onClick={toggleDrawer(true)}
      >
        <MdMenu style={{ color: "white", transform: "scale(1.5)" }} />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={(e) => e.stopPropagation()} 
        >
          <List>
            {categories.map((category) => (
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
            {managementItems.map((item) => (
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
    </aside>
  );
};

export default Sidebar;
