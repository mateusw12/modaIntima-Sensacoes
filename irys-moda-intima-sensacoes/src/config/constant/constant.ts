import { RecordType } from "../interface/interface";

export const SIZES = ["PP", "P", "M", "G", "GG"];

export const SIZE_ITEMS: RecordType[] = SIZES.map((el) => {
  return { label: el, value: el };
});
