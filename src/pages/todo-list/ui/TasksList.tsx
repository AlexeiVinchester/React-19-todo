import { TTask } from "../../../shared/tasksApi";
import { TaskCard } from "./TaskCard";

export const TasksList = () => {
  const tasks: TTask[] = []
  return (
    <div className="flex flex-col">
      {
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      }
    </div>
  );
}

