import { atom } from "recoil";

export const basketState = atom<Product[]>({
  key: "basketState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
