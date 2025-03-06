import { createTask, TTask } from "../../../shared/tasksApi";

export type TCreateTaskState = {
  title: string;
  error?: string;
};

export type TCreateTaskActionWrapperParams = {
  refetchTasks: () => void;
  userId: string;
};

export type TCreateTaskAction = (
  prevState: TCreateTaskState,
  formData: FormData
) => Promise<TCreateTaskState>;

export const createTaskActionWrapper = ({ refetchTasks, userId }: TCreateTaskActionWrapperParams): TCreateTaskAction => {
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




