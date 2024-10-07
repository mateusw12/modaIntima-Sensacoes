export interface IMenuItems {
  title: string;
  subCategories?: IMenuItems[];
  path?: string;
  disabled?: boolean;
}

// Atualização da constante CATEGORIES
export const CATEGORIES: IMenuItems[] = [
  {
    title: "Lingeries",
    subCategories: [
      { title: "Calcinhas", disabled: true },
      { title: "Conjuntos", disabled: true },
      { title: "Sutiãs", disabled: true },
    ],
  },
  {
    title: "Roupas de Dormir",
    subCategories: [
      { title: "Baby Dolls", disabled: true },
      { title: "Pijamas", disabled: true },
      { title: "Camisolas", disabled: true },
    ],
  },
  {
    title: "Sex Shop",
    subCategories: [
      { title: "Acessórios", disabled: true },
      { title: "Cosméticos", disabled: true },
      { title: "Brincadeiras", disabled: true },
      { title: "Fantasias", disabled: true },
    ],
  },
];

// Atualização da constante MANAGEMENT_ITEMS
export const MANAGEMENT_ITEMS: IMenuItems[] = [
  {
    title: "Cadastros",
    subCategories: [
      { title: "Produto", disabled: true },
      { title: "Categoria", path: "categoria" },
      { title: "Método de Pagamento", path: "metodo-pagamento" },
      { title: "Oferta", disabled: true },
      { title: "Rede Social", path: "rede-social" },
    ],
  },
  {
    title: "Consultas",
    subCategories: [
      { title: "Produtos", disabled: true },
      { title: "Pedidos", disabled: true },
      { title: "Ofertas", disabled: true },
    ],
  },
];
