import { atom } from "recoil";

export const tokenAtom = atom({
  key: "TOKEN",
  default: "",
});

export const userAtom = atom({
  key: "USER",
  default: {},
});
