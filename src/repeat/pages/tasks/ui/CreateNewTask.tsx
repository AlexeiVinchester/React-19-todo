import { useActionState, useOptimistic, useRef } from "react";
import { TRepeatCreateTaskAction } from "../lib/createTask.action";

type TRepeatCreateTaskFormProps = {
  createTaskAction: TRepeatCreateTaskAction;
}
export const RepeatCreateTaskForm = ({ createTaskAction }: TRepeatCreateTaskFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    createTaskAction,
    { title: '' }
  );

  const [optimisticState, setOptimisticState] = useOptimistic(state);

  const formRef = useRef<HTMLFormElement | null>(null);
  const formAction = (formData: FormData) => {
    setOptimisticState({ title: '' });
    dispatch(formData);
    formRef.current?.reset();
  };

  return (
    <form className="flex gap-2" action={formAction} ref={formRef}>
      <input
        className="border p-2 m-2 rounded disabled:bg-gray-400"
        disabled={isPending}
        name="title"
        type="text"
        defaultValue={optimisticState.title}
      />
      <button
        type="submit"
        className="disabled:bg-gray-400 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isPending}
      >
        Add
      </button>
      {optimisticState.error && <div className="text-red-500">{optimisticState.error}</div>}
    </form>
  );
}