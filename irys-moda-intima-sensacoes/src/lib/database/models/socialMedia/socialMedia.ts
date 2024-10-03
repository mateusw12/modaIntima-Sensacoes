import { ObjectId } from "mongodb";

export interface ISocialMedia {
  _id?: ObjectId;
  nome: string;
  nomeIcone: string;
  path: string;
}
