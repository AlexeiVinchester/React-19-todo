import { TTask } from "../../../shared/tasksApi";

type TTaskCardProps = {
  task: TTask
}

export const TaskCard = ({ task }: TTaskCardProps) => {
  return (
    <div
      className="border p-2 m-2 rounded bg-gray-100 flex gap-2 items-center"
    >
      {task.title}
      <form className="ml-auto">
        <button
          className="m-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

