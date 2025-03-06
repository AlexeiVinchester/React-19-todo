import { Suspense, useActionState } from "react";
import { TTask } from "../../../shared/tasksApi";
import { deleteTaskActionWrapper } from "../lib/actions";
import { TaskUserPreview } from "./TaskUserPreview";

type TTaskCardProps = {
  task: TTask;
  refetchTasks: () => void;
}

export const TaskCard = ({ task, refetchTasks }: TTaskCardProps) => {
  const [state, dispatch, isPending] = useActionState(
    deleteTaskActionWrapper({ refetchTasks }),
    {}
  );

  return (
    <div
      className="border p-2 m-2 rounded bg-gray-100 flex gap-2 items-center"
    >
      {task.title}
      <Suspense fallback={<div className="text-blue-300">loading email...</div>}>
        <TaskUserPreview userId={task.userId} />
      </Suspense>
      <form className="ml-auto" action={dispatch}>
        <input name="taskId" value={task.id} hidden readOnly />
        <button
          type="submit"
          className="m-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          disabled={isPending}
        >
          Delete
        </button>
        {state.error && <div className="text-red-500">{state.error}</div>}
      </form>
    </div>
  );
}

