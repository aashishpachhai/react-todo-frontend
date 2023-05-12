import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormInterface {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumber: number[];
  phones: { number: string }[];
  date: Date;
}

const Practice = () => {
  let renders = 0;
  const form = useForm<FormInterface>();

  const {
    register,
    handleSubmit,
    control,
    formState,
    reset,
    watch,
    getValues,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phones",
    control,
  });
  const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
  console.log({ touchedFields, dirtyFields, isDirty, isValid });
  const done = (data: FormInterface) => {
    console.log(data);
  };
  // const handle = () => {
  //   console.log(getValues("username"));
  //   setValue("username", "Pachhai", {
  //     // shouldValidate: true,
  //     // shouldDirty: true,
  //     // shouldTouch: true,
  //   });
  // };
  const onError = (errors: FieldErrors<FormInterface>) => {
    console.log({ errors });
  };
  const watcing = watch();
  // useEffect(() => {
  //   const subscribe = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => {
  //     subscribe.unsubscribe();
  //   };
  // }, [watch]);
  renders++;
  return (
    <div className="w-72">
      <h1 className="my-5 text-3xl">React Hooks Form {renders}</h1>
      {/* <h2>{JSON.stringify({ watcing })}</h2> */}
      <form
        action=""
        className="flex flex-col gap-4 w-72"
        onSubmit={handleSubmit(done, onError)}
        noValidate
      >
        <div className="flex flex-row justify-between w-72">
          {" "}
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("username", {
              required: {
                value: true,
                message: "value is needed in usernme",
              },
            })}
          />
        </div>
        <p className="text-sm text-red-600">{errors.username?.message}</p>
        <div className="flex flex-row  justify-between w-72 ">
          {" "}
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("email", {
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is not valid",
              },
              validate: {
                // notAdmin: (fieldvalue) => {
                //   if (
                //     fieldvalue &&
                //     fieldvalue !== "aashishmaharjan700@gmail.com"
                //   )
                //     return "Enter another email";
                // },
                Blacklist: (fieldvalue) => {
                  if (fieldvalue.endsWith("@outlook.com"))
                    return "This is unsupported domain";
                },
              },
            })}
          />
        </div>
        <p className="text-sm text-red-600">{errors.email?.message}</p>
        <div className="flex flex-row  justify-between w-72">
          {" "}
          <label htmlFor="">Channel</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("channel", {
              disabled: true,
            })}
          />
        </div>
        <p className="text-sm text-red-600">{errors.channel?.message}</p>
        <div className="flex flex-row  justify-between w-72">
          {" "}
          <label htmlFor="">Facebook</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Facebook account required",
              },
            })}
          />
        </div>
        <div className="flex flex-row  justify-between w-72">
          {" "}
          <label htmlFor="">Twitter</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "Twitter account required",
              },
            })}
          />
        </div>
        <div className="flex flex-row  justify-between w-72">
          {" "}
          <label htmlFor="">Primary Number</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("phoneNumber.0", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Primary number required",
              },
            })}
          />
        </div>
        <div className="flex flex-row  justify-between w-72">
          {" "}
          <label htmlFor="">Secondary Number</label>
          <input
            type="text"
            className="bg-slate-200 p-1 outline-none"
            {...register("phoneNumber.1")}
          />
        </div>
        {fields.map((field, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <div className="flex flex-row  justify-between w-72">
                {" "}
                <label htmlFor="">Number</label>
                <input
                  type="text"
                  className="bg-slate-200 p-1 outline-none"
                  {...register(`phones.${index}.number`)}
                />
              </div>
              {index > 0 && (
                <button onClick={() => remove(index)}>Clear</button>
              )}
            </div>
          );
        })}
        <div className="flex flex-row  justify-between w-72">
          {" "}
          <label htmlFor="">Date</label>
          <input
            type="date"
            className="bg-slate-200 p-1 outline-none"
            {...register("date", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Enter the date ",
              },
            })}
          />
        </div>
        <button onClick={() => append({ number: "" })}>Add</button>
        <div className="flex items-center w-72 text-center justify-center">
          <button className="bg-cyan-700 px-2 py-1 rounded-lg text-white ">
            Submit
          </button>
          {/* <button onClick={() => handle}>Click Me</button> */}
          <button onClick={() => reset()}>Clear</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Practice;
