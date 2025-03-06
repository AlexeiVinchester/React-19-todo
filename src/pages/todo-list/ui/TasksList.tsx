import { use } from "react";
import { TTask } from "../../../shared/tasksApi";
import { TaskCard } from "./TaskCard";

type TTasksListProps = {
  tasksPromise: Promise<TTask[]>;
  refetchTasks: () => void;
}

export const TasksList = ({ tasksPromise, refetchTasks }: TTasksListProps) => {

  const tasks = use(tasksPromise)
  return (
    <div className="flex flex-col">
      {
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} refetchTasks={refetchTasks} />
        ))
      }
    </div>
  );
}

