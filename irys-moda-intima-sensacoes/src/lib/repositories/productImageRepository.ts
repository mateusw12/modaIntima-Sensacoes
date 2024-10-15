import { ObjectId } from "mongodb";
import { convertObjectId } from "@/util/convertObjectId";
import { connectDb } from "../database/connectDb";
import { IProductImage } from "../database/models/product/product";

// Buscar todas as redes sociais
export const findAll = async (): Promise<IProductImage[]> => {
  const db = await connectDb();
  return await db
    .collection<IProductImage>("productsImages")
    .find({})
    .toArray();
};

// Buscar uma rede social por ID
export const findById = async (id: string): Promise<IProductImage | null> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  return await db.collection<any>("productsImages").findOne({ _id });
};

// Criar uma nova rede social
export const create = async (data: IProductImage): Promise<void> => {
  const db = await connectDb();
  await db.collection<IProductImage>("productsImages").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  data: Partial<IProductImage>
): Promise<void> => {
  const _id: ObjectId = convertObjectId(data);
  data._id = _id;
  const db = await connectDb();
  await db.collection("productsImages").updateOne({ _id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: string): Promise<void> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  await db.collection("productsImages").deleteOne({ _id });
};
