import { TRepeatTask } from "../model/task.type";

export type TRepeatPaginatedResponse<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: null | number;
  pages: number;
  prev: null | number;
  page: number;
}

type repeatFetchTasksParams = {
  page?: number;
  per_page?: number;
  filters?: {
    userId?: string;
    title?: string;
  },
  sort?: {
    createdAt: 'asc' | 'desc'
  }
};

export const repeatFetchTasks = async (
  {
    page = 1,
    per_page = 5,
    sort = { createdAt: "asc" },
    filters,
  }: repeatFetchTasksParams
) => {
  const response = await fetch(
    `http://localhost:3001/tasks?_page=${page}&_per_page=${per_page}&_sort=${sort.createdAt === "asc" ? "createdAt" : "-createdAt"
    }&userId=${filters?.userId}&title=${filters?.title}`
  );

  const data = await response.json();
  const result: TRepeatPaginatedResponse<TRepeatTask> = { ...data, page }
  return result;
};

export const repeatCreateTask = async (task: TRepeatTask) => {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  const data = await response.json();

  return data;
};

export const repeatDeleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  return data;
};
