import { TRepeatTask } from "../model/task.type"
import { RepeatTaskCard } from "./TaskCard"
import { TRepeatDeleteAction } from "../lib/deleteTask.action";

type TRepeatTasksListProps = {
  useRepeatTasksList: () => TRepeatTask[]
  deleteAction: TRepeatDeleteAction;
  userId: string;
};

export const RepeatTasksList = ({ useRepeatTasksList, deleteAction, userId }: TRepeatTasksListProps) => {
  const tasks = useRepeatTasksList();

  return (
    <div className="flex flex-col">
      {tasks.map(task => (
        <RepeatTaskCard 
          key={task.id} 
          task={task} 
          deleteAction={deleteAction} 
          userId={userId}
          />
      ))}
    </div>
  );
}