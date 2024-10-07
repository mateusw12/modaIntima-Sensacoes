import { NextApiRequest, NextApiResponse } from "next";
import {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} from "@/lib/repositories/paymentMethodRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const { cod } = req.query;
      if (cod) {
        // Buscar Método de Pagamento por ID
        const paymentMethod = await findById(cod as string);
        if (!paymentMethod) {
          return res
            .status(404)
            .json({ message: "Método de Pagamento não encontrada" });
        }
        return res.status(200).json(paymentMethod);
      } else {
        // Buscar todas as redes sociais
        const redesSociais = await findAll();
        return res.status(200).json(redesSociais);
      }

    case "POST":
      try {
        const newPaymentMethod = req.body;
        await create(newPaymentMethod);
        return res
          .status(201)
          .json({ message: "Método de Pagamento criada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao criar a Método de Pagamento", error });
      }

    case "PUT":
      try {
        await updateById(req.body);
        return res
          .status(200)
          .json({ message: "Método de Pagamento atualizada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar a Método de Pagamento", error });
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
          .json({ message: "Método de Pagamento deletada com sucesso" });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Erro ao deletar a Método de Pagamento", error });
      }

    default:
      return res
        .status(405)
        .json({ message: `Método ${method} não permitido` });
  }
}
