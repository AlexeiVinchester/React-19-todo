import { useState, startTransition, useMemo, useOptimistic, use } from "react";
import { repeatFetchTasks } from "../api/api";
import { repeatCreateTaskActionWrapper } from "./createTask.action";
import { repeatDeleteTaskActionWrapper } from "./deleteTask.action";
import { TRepeatTask } from "../model/task.type";

export const useRepeatTasks = (userId: string, search: string) => {
  const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(() => repeatFetchTasks({
    filters: { userId, title: search},
  }));

  const refetchTasks = async ({
    page,
    title = search,
    createdAt = 'asc',
  }: {
    page?: number,
    title?: string,
    createdAt?: 'asc' | 'desc'
  }) => {
    page = page ?? (await paginatedTasksPromise).page;
    startTransition(() =>
      setPaginatedTasksPromise(
        repeatFetchTasks({
          filters: { userId, title },
          page,
          sort: { createdAt }
        })
      )
    );
  }

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

  const handleChangePage = (page: number) => {
    refetchTasks({ page });
  };

  return {
    tasksPromise,
    useRepeatTasksList,
    paginatedTasksPromise,
    refetchTasks,
    handleChangePage,
    deleteTaskAction: repeatDeleteTaskActionWrapper({ refetchTasks: () => refetchTasks({}), setDeletedOptimisticTasksIds }),
    createTaskAction: repeatCreateTaskActionWrapper({ refetchTasks: () => refetchTasks({}), userId, setCreatedOptimisticTasks })
  }
}