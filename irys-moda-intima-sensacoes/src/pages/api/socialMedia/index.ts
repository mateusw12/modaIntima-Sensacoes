import { NextApiRequest, NextApiResponse } from "next";
import {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} from "@/lib/repositories/redeSocialRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const { cod } = req.query;
      if (cod) {
        // Buscar rede social por ID
        const redeSocial = await findById(cod as string);
        if (!redeSocial) {
          return res
            .status(404)
            .json({ message: "Rede social não encontrada" });
        }
        return res.status(200).json(redeSocial);
      } else {
        // Buscar todas as redes sociais
        const redesSociais = await findAll();
        return res.status(200).json(redesSociais);
      }

    case "POST":
      try {
        const newRedeSocial = req.body;
        await create(newRedeSocial);
        return res
          .status(201)
          .json({ message: "Rede social criada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao criar a rede social", error });
      }

    case "PUT":
      try {
        await updateById(req.body);
        return res
          .status(200)
          .json({ message: "Rede social atualizada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar a rede social", error });
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
          .json({ message: "Rede social deletada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao deletar a rede social", error });
      }

    default:
      return res
        .status(405)
        .json({ message: `Método ${method} não permitido` });
  }
}
