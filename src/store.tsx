import { create } from "zustand";
interface ZustandInterface {
  id: number;
  title: string;
  errorMsg: string;
  settitle: (value: string) => void;
  description: string;
  setdescription: (value: string) => void;
  isUpdate: boolean;
  setisUpdate: (value: boolean) => void;
  setid: (value: number) => void;
  seterrorMsg: (value: string) => void;
}
export const useStore = create<ZustandInterface>((set) => ({
  id: 0,
  title: "",
  errorMsg: "",
  description: "",
  settitle: (value) => set({ title: value }),
  setdescription: (value) => set({ description: value }),
  isUpdate: false,
  setisUpdate: (value) => set({ isUpdate: value }),
  setid: (value) => set({ id: value }),
  seterrorMsg: (value) => set({ errorMsg: value }),
}));
