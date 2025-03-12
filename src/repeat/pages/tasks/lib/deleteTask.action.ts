import { TRepeatAction } from "../../../shared/types/action";
import { repeatDeleteTask } from "../api/api";

type TRepeatDeleteActionState = {
  error?: string;
};

type TRepeatDeleteTaskActionWrapperParams = {
  refetchTasks: () => void;
  setDeletedOptimisticTasksIds: (id: string) => void;
};

export type TRepeatDeleteAction = TRepeatAction<TRepeatDeleteActionState>;

export const repeatDeleteTaskActionWrapper = (
  { refetchTasks, setDeletedOptimisticTasksIds }: TRepeatDeleteTaskActionWrapperParams
): TRepeatDeleteAction => {
  return async (_, formData) => {
    const taskId = formData.get('taskId') as string;
    try {
      setDeletedOptimisticTasksIds(taskId)
      await repeatDeleteTask(taskId);
      refetchTasks();

      return {}
    } catch {
      return {
        error: 'Something went wrong while deletion!'
      }
    }
  }
}