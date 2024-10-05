import { Db, ObjectId } from "mongodb";
import clientPromise from "@/lib/database/mongoDb";
import { ISocialMedia } from "../database/models/socialMedia/socialMedia";
import { convertObjectId } from "@/util/convertObjectId";

// Obter a conexão com o banco de dados
const getDb = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db("irysModaIntima");
};

// Buscar todas as redes sociais
export const findAll = async (): Promise<ISocialMedia[]> => {
  const db = await getDb();
  return await db.collection<ISocialMedia>("redeSocials").find({}).toArray();
};

// Buscar uma rede social por ID
export const findById = async (id: string): Promise<ISocialMedia | null> => {
  const _id = new ObjectId(id);
  const db = await getDb();
  return await db.collection<any>("redeSocials").findOne({ _id });
};

// Criar uma nova rede social
export const create = async (data: ISocialMedia): Promise<void> => {
  const db = await getDb();
  await db.collection<ISocialMedia>("redeSocials").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  data: Partial<ISocialMedia>
): Promise<void> => {
  let _id: ObjectId = convertObjectId(data);
  data._id = _id;
  const db = await getDb();
  await db.collection("redeSocials").updateOne({ _id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: string): Promise<void> => {
  const _id = new ObjectId(id);
  const db = await getDb();
  await db.collection("redeSocials").deleteOne({ _id });
};
