"use server";
import clientPromise from "./mongoDb";

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const client = await clientPromise; // Usa o client já conectado
    await client.db("irysmodaintima").command({ ping: 1 }); // Testa a conexão ao banco de dados
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    isConnected = true;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
  return isConnected;
}
