import { testDatabaseConnection } from "@/lib/database/testConnection";

export default async function handler(req: any, res: any) {
  let isConnected = await testDatabaseConnection();

  if (!isConnected) {
    return res.status(500).end("Database not connected!");
  }

  if (req.method === "GET") {
    try {
      // Pega o cliente conectado do MongoDB
      const client = await import("@/lib/database/mongoDb").then((mod) => mod.default);
      const db = client.db("irysModaIntima");
      const redeSocials = await db
        .collection("redeSocials")
        .find({})
        .toArray();

      // Mapeia os dados para retornar no formato desejado
      const formattedData = redeSocials.map((data) => ({
        _id: {
          $oid: data._id.toString(),
        },
        nome: data.nome,
        idade: data.idade,
        cidade: data.cidade,
      }));

      return res.status(200).json(formattedData);
    } catch (error) {
      console.error("Erro ao buscar redes sociais:", error);
      return res.status(500).json({ message: "Erro ao buscar dados" });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
