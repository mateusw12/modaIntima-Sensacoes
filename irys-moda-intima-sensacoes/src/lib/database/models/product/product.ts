export interface IProductImage {
  _id?: any;
  codProduto: any;
  imagens: IImage[];
}

export interface IImage {
  nome: string;
  byte: string;
}

export interface IProduct {
  _id?: any;
  nome: string;
  descricao: string;
  cor: string;
  preco: number;
  dataCadastro: Date;
  codCategoria: any;
  tamanho: string;
}
