import { createTask, deleteTask, TTask } from "../../../shared/api/tasksApi";
import { TAction } from "../../../shared/types/types";

type TCreateTaskState = {
  title: string;
  error?: string;
};

type TCreateTaskActionWrapperParams = {
  refetchTasks: () => void;
  userId: string;
};

export type TCreateTaskAction = TAction<TCreateTaskState>;

export const createTaskActionWrapper = (
  { refetchTasks, userId }: TCreateTaskActionWrapperParams
): TCreateTaskAction => {
  return async (_, formData) => {
    const title = formData.get('title') as string;
    const task: TTask = {
      id: crypto.randomUUID(),
      userId,
      title,
      done: false,
      createdAt: Date.now()
    }

    try {
      await createTask(task);

      refetchTasks();

      return {
        title: ''
      };
    } catch {
      return {
        title,
        error: 'Something went wrong while creating new task!'
      };
    }
  };
};

type TDeleteActionState = {
  error?: string;
};

type TDeleteActionWrapperParams = {
  refetchTasks: () => void;
};

export type TDeleteAction = TAction<TDeleteActionState>;

export const deleteTaskActionWrapper = (
  { refetchTasks }: TDeleteActionWrapperParams
): TDeleteAction => {
  return async (_, formData) => {
    const id = formData.get('taskId') as string;
    try {
      await deleteTask(id);
      refetchTasks();

      return {};
    } catch {
      return { error: 'Something went wrong while deletion of task!' }
    }
  };
};




