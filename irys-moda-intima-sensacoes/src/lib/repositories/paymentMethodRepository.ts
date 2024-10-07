import { ObjectId } from "mongodb";
import { convertObjectId } from "@/util/convertObjectId";
import { connectDb } from "../database/connectDb";
import { IPaymentMethod } from "../database/models/paymentMethod/paymentMethod";

// Buscar todas as redes sociais
export const findAll = async (): Promise<IPaymentMethod[]> => {
  const db = await connectDb();
  return await db.collection<IPaymentMethod>("paymentMethods").find({}).toArray();
};

// Buscar uma rede social por ID
export const findById = async (id: string): Promise<IPaymentMethod | null> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  return await db.collection<any>("paymentMethods").findOne({ _id });
};

// Criar uma nova rede social
export const create = async (data: IPaymentMethod): Promise<void> => {
  const db = await connectDb();
  await db.collection<IPaymentMethod>("paymentMethods").insertOne(data);
};

// Atualizar uma rede social por ID
export const updateById = async (
  data: Partial<IPaymentMethod>
): Promise<void> => {
  const _id: ObjectId = convertObjectId(data);
  data._id = _id;
  const db = await connectDb();
  await db.collection("paymentMethods").updateOne({ _id }, { $set: data });
};

// Deletar uma rede social por ID
export const deleteById = async (id: string): Promise<void> => {
  const _id = new ObjectId(id);
  const db = await connectDb();
  await db.collection("paymentMethods").deleteOne({ _id });
};
