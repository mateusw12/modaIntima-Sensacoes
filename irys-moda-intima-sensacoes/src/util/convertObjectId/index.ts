import { ObjectId } from "mongodb";

export function convertObjectId<T extends { _id?: ObjectId | string }>(data: Partial<T>): ObjectId {
  let _id: ObjectId;

  if (typeof data._id === "string") {
    _id = new ObjectId(data._id);
  } else if (data._id instanceof ObjectId) {
    _id = data._id; 
  } else {
    throw new Error("ID inválido para a atualização");
  }

  return _id;
}
