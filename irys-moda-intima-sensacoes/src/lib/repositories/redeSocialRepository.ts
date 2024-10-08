import { ObjectId } from "mongodb";
import { ISocialMedia } from "../database/models/socialMedia/socialMedia";
import { convertObjectId } from "@/util/convertObjectId";
import { connectDb } from "../database/connectDb";

// Buscar todas as redes sociais
export const findAll = async (): Promise<ISocialMedia[]> => {
  const db = await connectDb();
  return await db.collection<ISocialMedia>("redeSocials").find({}).toArray();
};

// Buscar uma rede social por ID
export const findById = async (id: string): Promise<ISocialMedia | null> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  return await db.collection<any>("redeSocials").findOne({ _id });
};

// Criar uma nova rede social
export const create = async (data: ISocialMedia): Promise<void> => {
  const db = await connectDb();
  await db.collection<ISocialMedia>("redeSocials").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  data: Partial<ISocialMedia>
): Promise<void> => {
  const _id: ObjectId = convertObjectId(data);
  data._id = _id;
  const db = await connectDb();
  await db.collection("redeSocials").updateOne({ _id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: string): Promise<void> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  await db.collection("redeSocials").deleteOne({ _id });
};
