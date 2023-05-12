import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { queryClient } from "../main";

interface GetInterface {
  data: {
    id: number;
    title: string;
    description: string;
  };
  onEdit: (d: GetInterface["data"]) => void;
}

function delet(ids: number) {
  return axios.delete(`http://localhost:3000/todo/${ids}`);
}

const SingleItem = ({ data, onEdit }: GetInterface) => {
  const [show, setshow] = useState(true);
  const { mutate } = useMutation(
    ["del"],
    delet,

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch"]);
      },
    }
  );

  return (
    <div>
      <div key={data.id} className="m-3">
        <div className=" bg-cyan-700 p-3 ml-2 flex flex-row items-center justify-between text-white rounded-sm">
          <div
            className="flex items-center gap-3"
            onClick={() => setshow(!show)}
          >
            {show ? <AiFillCaretRight /> : <AiFillCaretDown />}{" "}
            <p>{data.title}</p>
          </div>

          <div className="flex gap-6">
            <AiOutlineEdit size={25} onClick={() => onEdit(data)} />
            <AiOutlineDelete size={25} onClick={() => mutate(data.id)} />
          </div>
        </div>
        <div className={`ml-2 p-2 bg-slate-50 ${show ? "hidden" : "block"}`}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
