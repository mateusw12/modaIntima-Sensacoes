import { NextApiRequest, NextApiResponse } from "next";
import {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} from "@/lib/repositories/categoricRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const { cod } = req.query;
      if (cod) {
        // Buscar Categoria por ID
        const categoric = await findById(cod as string);
        if (!categoric) {
          return res
            .status(404)
            .json({ message: "Categoria não encontrada" });
        }
        return res.status(200).json(categoric);
      } else {
        // Buscar todas as redes sociais
        const redesSociais = await findAll();
        return res.status(200).json(redesSociais);
      }

    case "POST":
      try {
        const newCategoric = req.body;
        await create(newCategoric);
        return res
          .status(201)
          .json({ message: "Categoria criada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao criar a Categoria", error });
      }

    case "PUT":
      try {
        await updateById(req.body);
        return res
          .status(200)
          .json({ message: "Categoria atualizada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar a Categoria", error });
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
          .json({ message: "Categoria deletada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao deletar a Categoria", error });
      }

    default:
      return res
        .status(405)
        .json({ message: `Método ${method} não permitido` });
  }
}
