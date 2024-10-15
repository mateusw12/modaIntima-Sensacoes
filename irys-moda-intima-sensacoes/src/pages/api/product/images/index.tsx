import { NextApiRequest, NextApiResponse } from "next";
import {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} from "@/lib/repositories/productImageRepository";

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
        const productImage = await findById(cod as string);
        if (!productImage) {
          return res
            .status(404)
            .json({ message: "Imagem do poduto não encontrada" });
        }
        return res.status(200).json(productImage);
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
          .json({ message: "Imagem do poduto criada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao criar a imagem do poduto", error });
      }

    case "PUT":
      try {
        await updateById(req.body);
        return res
          .status(200)
          .json({ message: "Imagem do poduto atualizada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar a imagem do poduto", error });
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
