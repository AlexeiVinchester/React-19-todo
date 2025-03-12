import { useState, startTransition, useMemo } from "react";
import { fetchTasks } from "../../../shared/api/tasksApi";

export const useTasks = ({
  userId,
  search,
  createdAtSort
}: {
  userId: string;
  search: string;
  createdAtSort: 'asc' | 'desc';
}) => {
  const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(() => fetchTasks({
    page: 1,
    filters: { userId, title: search },
    sort: { createdAt: createdAtSort }
  }));

  const refetchTasks = async ({
    page,
    title = search,
    createdAt = createdAtSort
  }: {
    page?: number;
    title?: string;
    createdAt?: 'asc' | 'desc'
  }) => {
    page = page ?? (await paginatedTasksPromise).page;
    startTransition(() =>
      setPaginatedTasksPromise(
        fetchTasks({
          filters: { userId, title },
          page,
          sort: { createdAt }
        })
      )
    );
  };

  const tasksPromise = useMemo(
    () => paginatedTasksPromise.then((res) => res.data),
    [paginatedTasksPromise]
  );

  return { refetchTasks, paginatedTasksPromise, tasksPromise };
}