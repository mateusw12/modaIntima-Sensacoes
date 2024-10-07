import { ObjectId } from "mongodb";
import { convertObjectId } from "@/util/convertObjectId";
import { connectDb } from "../database/connectDb";
import { ICategoric } from "../database/models/categoric/categoric";

// Buscar todas as redes sociais
export const findAll = async (): Promise<ICategoric[]> => {
  const db = await connectDb();
  return await db.collection<ICategoric>("categorics").find({}).toArray();
};

// Buscar uma rede social por ID
export const findById = async (id: string): Promise<ICategoric | null> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  return await db.collection<any>("categorics").findOne({ _id });
};

// Criar uma nova rede social
export const create = async (data: ICategoric): Promise<void> => {
  const db = await connectDb();
  await db.collection<ICategoric>("categorics").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  data: Partial<ICategoric>
): Promise<void> => {
  const _id: ObjectId = convertObjectId(data);
  data._id = _id;
  const db = await connectDb();
  await db.collection("categorics").updateOne({ _id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: string): Promise<void> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  await db.collection("categorics").deleteOne({ _id });
};
