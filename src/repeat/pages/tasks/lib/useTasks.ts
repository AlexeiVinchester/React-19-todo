import { useState, startTransition, useMemo, useOptimistic, use } from "react";
import { repeatFetchTasks } from "../api/api";
import { repeatCreateTaskActionWrapper } from "./createTask.action";
import { repeatDeleteTaskActionWrapper } from "./deleteTask.action";
import { TRepeatTask } from "../model/task.type";

export const useRepeatTasks = (userId: string) => {
  const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(() => repeatFetchTasks({
    filters: { userId, },
  }));

  const refetchTasks = () =>
    startTransition(() =>
      setPaginatedTasksPromise(
        repeatFetchTasks({ filters: { userId } })
      )
    );

  const tasksPromise = useMemo(
    () => paginatedTasksPromise.then((res) => res.data),
    [paginatedTasksPromise]
  );

  const [createdOptimisticTasks, setCreatedOptimisticTasks] = useOptimistic(
    [] as TRepeatTask[],
    (prevState, task: TRepeatTask) => [...prevState, task]
  );

  const [deletedOptimisticTasksIds, setDeletedOptimisticTasksIds] = useOptimistic(
    [] as never as string,
    (prevState, id: string) => prevState.concat(id)
  );

  const useRepeatTasksList = () => {
    const tasks = use(tasksPromise);

    return tasks.concat(createdOptimisticTasks).filter(task => !deletedOptimisticTasksIds.includes(task.id))
  };

  return {
    tasksPromise,
    useRepeatTasksList,
    paginatedTasksPromise,
    setPaginatedTasksPromise,
    refetchTasks,
    deleteTaskAction: repeatDeleteTaskActionWrapper({ refetchTasks, setDeletedOptimisticTasksIds }),
    createTaskAction: repeatCreateTaskActionWrapper({ refetchTasks, userId, setCreatedOptimisticTasks })
  }
}