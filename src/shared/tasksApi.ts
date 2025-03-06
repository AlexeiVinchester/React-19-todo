export type TTask = {
  id: string;
  userId: string;
  title: string;
  done: boolean;
  createdAt: number;
}

export type TPaginatedResponse<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

type fetchTasksParams = {
  page?: number;
  per_page?: number;
  filters?: {
    userId?: string;
    title?: string;
  };
  sort?: {
    createdAt: "asc" | "desc";
  };
}

export const fetchTasks = async (
  {
    page = 1,
    per_page = 10,
    sort = { createdAt: "asc" },
    filters,
  }: fetchTasksParams
) => {
  const response = await fetch(
    `http://localhost:3001/tasks?_page=${page}&_per_page=${per_page}&_sort=${sort.createdAt === "asc" ? "createdAt" : "-createdAt"
    }&userId=${filters?.userId}`
  );

  const data: TPaginatedResponse<TTask> = await response.json()
  return data;
}

export const createTask = async (task: Omit<TTask, 'id' | 'createdAt'>) => {
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

export const updateTask = async (id: string, task: Partial<TTask>) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

  const data = await response.json();

  return data;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  return data;
}
