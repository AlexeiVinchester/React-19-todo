import { TRepeatAction } from "../../../shared/types/action";
import { repeatCreateTask } from "../api/api";
import { TRepeatTask } from "../model/task.type";

type TRepeatCreateTaskState = {
  title?: string;
  error?: string;
};

type TRepeatCreateTaskActionWrapperParams = {
  refetchTasks: () => void;
  userId: string;
  setCreatedOptimisticTasks: (action: TRepeatTask) => void
};

export type TRepeatCreateTaskAction = TRepeatAction<TRepeatCreateTaskState>;

export const repeatCreateTaskActionWrapper = (
  { refetchTasks, userId, setCreatedOptimisticTasks}: TRepeatCreateTaskActionWrapperParams
): TRepeatCreateTaskAction => {
  return async (_, formData) => {
    const title = formData.get('title') as string;

    const task: TRepeatTask = {
      title,
      id: crypto.randomUUID(),
      userId,
      done: false,
      createdAt: Date.now()
    }

    try {
      setCreatedOptimisticTasks(task)
      await repeatCreateTask(task);
      refetchTasks();

      return {
        title: ''
      }
    } catch {
      return {
        title,
        error: 'Something went wrong while creating new taks!'
      }
    }
  };
};
