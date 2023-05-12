import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { queryClient } from "../main";
import { useStore } from "../store";
interface PostTodo {
  title: string;
  description: string;
}
function todoadd(todo: PostTodo) {
  return axios.post("http://localhost:3000/todo", todo);
}
export const addtodo = (onSuccess?: () => void) => {
  const { seterrorMsg } = useStore();
  return useMutation(todoadd, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch"] });
      if (onSuccess) onSuccess();
    },
    onError: (err: any) => {
      // console.log(err);
      seterrorMsg(err.response.statusText);
      setTimeout(() => {
        seterrorMsg("");
      }, 3000);
    },
  });
};

export default addtodo;
