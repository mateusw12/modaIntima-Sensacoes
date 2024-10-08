import { ObjectId } from "mongodb";
import { convertObjectId } from "@/util/convertObjectId";
import { connectDb } from "../database/connectDb";
import { IProduct } from "../database/models/product/product";

// Buscar todas as redes sociais
export const findAll = async (): Promise<IProduct[]> => {
  const db = await connectDb();
  return await db.collection<IProduct>("products").find({}).toArray();
};

// Buscar uma rede social por ID
export const findById = async (id: string): Promise<IProduct | null> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  return await db.collection<any>("products").findOne({ _id });
};

// Criar uma nova rede social
export const create = async (data: IProduct): Promise<void> => {
  const db = await connectDb();
  await db.collection<IProduct>("products").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  data: Partial<IProduct>
): Promise<void> => {
  const _id: ObjectId = convertObjectId(data);
  data._id = _id;
  const db = await connectDb();
  await db.collection("products").updateOne({ _id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: string): Promise<void> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  await db.collection("products").deleteOne({ _id });
};
