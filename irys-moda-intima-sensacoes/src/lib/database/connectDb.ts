import { Db } from "mongodb";
import clientPromise from "./mongoDb";

// Obter a conexão com o banco de dados
export const connectDb = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db("irysModaIntima");
};
