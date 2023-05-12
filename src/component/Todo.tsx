import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { queryClient } from "../main";
import { useStore } from "../store";
import TodoItems from "./TodoItems";
import addtodo from "./addtodo";
import { useState } from "react";
function sendupdate(body: { id: number; title: string; description: string }) {
  return axios.patch(`http://localhost:3000/todo/${body.id}`, body);
}
interface FormData {
  title: string;
  description: string;
}
const schema = yup.object({
  title: yup.string().required("Username is required").max(20),
  description: yup.string().required("Description is required").max(50),
});
const Todo = () => {
  const [updateId, setUpdateId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { mutate: add } = addtodo(() => {
    reset();
  });

  const { mutate: update } = useMutation(["update"], sendupdate, {
    onSuccess: () => {
      reset();
      setUpdateId(null);
      queryClient.invalidateQueries(["fetch"]);
    },
  });

  const handle = (data: FormData) => {
    if (data) {
      if (updateId) {
        const body = { id: updateId, ...data };

        update(body);
      } else {
        add(data);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-row    gap-6">
        <form
          className="flex flex-col shadow-md"
          onSubmit={handleSubmit(handle)}
        >
          <div className="w-[400px] h-96 bg-cyan-700  flex flex-col p-3 rounded-md ">
            <h1 className="text-3xl p-5 text-white">Todo </h1>

            <label htmlFor="" className="mx-2 text-white">
              <div className="flex justify-between">
                <h1>Title</h1>
              </div>
            </label>
            <input
              type="text"
              className={`m-2 p-2 rounded-lg outline-none`}
              {...register("title")}
            />
            <p className="text-red-400">{errors.title?.message}</p>
            <div className="flex justify-between">
              <h1 className={`text-white`}>Description</h1>
            </div>
            <textarea
              {...register("description")}
              className={`m-2 outline-none rounded-lg p-2 `}
            />
            <p className="text-red-400">{errors.description?.message}</p>
            <button type="submit" className="my-3 text-white">
              {updateId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
        <TodoItems
          onEdit={(d) => {
            setValue("title", d.title);
            setValue("description", d.description);
            setUpdateId(d.id);
          }}
        />
      </div>
    </div>
  );
};

export default Todo;
