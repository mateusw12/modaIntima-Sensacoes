import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const uri = process.env.MONGO_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Em modo de desenvolvimento, usar uma variável global para evitar reconectar em cada reload
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, {});
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Em produção, criar uma nova conexão, se necessário
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
}

// Exportar o clientPromise para ser utilizado nas funções que precisem da conexão
export default clientPromise;
