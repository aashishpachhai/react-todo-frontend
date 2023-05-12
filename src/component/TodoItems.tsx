import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import SingleItem from "./SingleItem";
export interface GetInterface {
  id: number;
  title: string;
  description: string;
}
function getData() {
  return axios.get<GetInterface[]>("http://localhost:3000/todo");
}

export interface TodoItemsProps {
  onEdit: (d: GetInterface) => void;
}
const TodoItems = ({ onEdit }: TodoItemsProps) => {
  const [show, setshow] = useState(true);
  const [datas, setdatas] = useState<GetInterface[]>([]);
  const { isLoading } = useQuery(["fetch"], getData, {
    onSuccess: (data) => {
      setdatas(data.data);
    },
  });
  if (isLoading) {
    return <div>Loadings.....</div>;
  } else {
    return (
      <div className="w-[900px]">
        <h1 className="text-3xl font-bold m-2 ">Todo List</h1>
        {datas.map((data: GetInterface) => {
          return <SingleItem data={data} key={data.id} onEdit={onEdit} />;
        })}
      </div>
    );
  }
};

export default TodoItems;
