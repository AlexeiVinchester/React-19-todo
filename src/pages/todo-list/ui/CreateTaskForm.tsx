import { useActionState } from "react";
import { createTaskActionWrapper } from "../lib/actions";

type TCreateUserFormProps = {
  refetchTasks: () => void;
  userId: string;
}

export const CreateTaskForm = ({ refetchTasks, userId }: TCreateUserFormProps) => {

  const [state, dispatch, isPending] = useActionState(
    createTaskActionWrapper({ refetchTasks, userId }),
    { title: '' }
  );

  return (
    <form className="flex gap-2" action={dispatch}>
      <input
        className="border p-2 m-2 rounded disabled:bg-gray-400"
        disabled={isPending}
        name="title"
        type="text"
        defaultValue={state.title}
      />
      <button
        type="submit"
        disabled={isPending}
        className="disabled:bg-gray-400 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  );
}
