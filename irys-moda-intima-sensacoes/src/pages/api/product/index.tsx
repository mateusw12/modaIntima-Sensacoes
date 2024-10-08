import { NextApiRequest, NextApiResponse } from "next";
import {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} from "@/lib/repositories//productRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const { cod } = req.query;
      if (cod) {
        // Buscar Produto por ID
        const product = await findById(cod as string);
        if (!product) {
          return res
            .status(404)
            .json({ message: "Produto não encontrada" });
        }
        return res.status(200).json(product);
      } else {
        // Buscar todas as redes sociais
        const products = await findAll();
        return res.status(200).json(products);
      }

    case "POST":
      try {
        const newProduct = req.body;
        await create(newProduct);
        return res
          .status(201)
          .json({ message: "Produto criada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao criar a Produto", error });
      }

    case "PUT":
      try {
        await updateById(req.body);
        return res
          .status(200)
          .json({ message: "Produto atualizada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar a Produto", error });
      }

    case "DELETE":
      const { id } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ message: "ID é necessário para deletar" });
      }
      try {
        await deleteById(id);
        return res
          .status(200)
          .json({ message: "Produto deletada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao deletar a Produto", error });
      }

    default:
      return res
        .status(405)
        .json({ message: `Método ${method} não permitido` });
  }
}
