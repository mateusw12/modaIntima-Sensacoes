import { Db, ObjectId } from "mongodb";
import clientPromise from "@/lib/database/mongoDb";
import { ISocialMedia } from "../database/models/socialMedia/socialMedia";

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
export const findById = async (id: ObjectId): Promise<ISocialMedia | null> => {
  const db = await getDb();
  return db.collection<ISocialMedia>("redeSocials").findOne({ id });
};

// Criar uma nova rede social
export const create = async (data: ISocialMedia): Promise<void> => {
  const db = await getDb();
  await db.collection<ISocialMedia>("redeSocials").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  id: ObjectId,
  data: Partial<ISocialMedia>
): Promise<void> => {
  const db = await getDb();
  await db
    .collection<ISocialMedia>("redeSocials")
    .updateOne({ id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: Object): Promise<void> => {
  const db = await getDb();
  await db.collection<ISocialMedia>("redeSocials").deleteOne({ id });
};
