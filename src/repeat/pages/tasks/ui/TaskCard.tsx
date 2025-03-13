import { Suspense, useActionState } from "react";
import { TRepeatDeleteAction } from "../lib/deleteTask.action";
import { TRepeatTask } from "../model/task.type";
import { RepeatUserPreview } from "./UserReview";

type TReapeatTaskCardProps = {
  task: TRepeatTask;
  deleteAction: TRepeatDeleteAction;
  userId: string;
};

export const RepeatTaskCard = ({ task, deleteAction, userId }: TReapeatTaskCardProps) => {
  const [state, dispatch, isPending] = useActionState(
    deleteAction,
    {}
  );
  return (
    <div
      className="border p-2 m-2 rounded bg-gray-100 flex gap-2 items-center"
    >
      {task.title}
      <Suspense fallback={<div className="text-green-700">Loading email...</div>}>
        <RepeatUserPreview userId={userId} />
      </Suspense>
      <form className="ml-auto" action={dispatch}>
        <input hidden readOnly name="taskId" value={task.id} />
        <button
          disabled={isPending}
          className="m-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          type="submit"
        >
          Delete
        </button>
        {state.error && <div className="text-red-500">{state.error}</div>}
      </form>
    </div>
  );
};