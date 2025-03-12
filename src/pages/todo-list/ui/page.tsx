import { Suspense, useRef, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CreateTaskForm } from "./CreateTaskForm"
import { TasksList, } from "./TasksList"
import { useParams } from "react-router"
import { PaginationContainer } from "../../../shared/ui/PaginationContainer"
import { useTasks } from "../lib/useTasks"

export const TodolistPage = () => {
  const { userId = '' } = useParams();

  const [search, setSearch] = useState('');
  const [createdAtSort, setCreatedAtSort] = useState<'asc' | 'desc'>('asc');

  const { refetchTasks, paginatedTasksPromise, tasksPromise } = useTasks({ userId, search, createdAtSort })

  const handleChangePage = (page: number) => {
    refetchTasks({ page })
  };

  const debounceTimerRef = useRef<number>(0);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(
      () => refetchTasks({ title: e.target.value }),
      2000
    );
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const createdAt = e.target.value as 'asc' | 'desc';
    setCreatedAtSort(createdAt);
    refetchTasks({ createdAt })
  };

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">{userId}</h1>
      <CreateTaskForm refetchTasks={() => refetchTasks({})} userId={userId} />
      <div className="flex gap-2">
        <input
          className="border p-2 m-2 rounded"
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleChangeSearch}
        />
        <select
          onChange={handleChangeSort}
          value={createdAtSort}
          className="border rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">Something goes wrong! {JSON.stringify(e)}</div>}>
        <Suspense fallback={<p>Loading...</p>}>
          <TasksList
            tasksPromise={tasksPromise}
            refetchTasks={() => refetchTasks({})}
          />
          <PaginationContainer
            handleChangePage={handleChangePage}
            paginatedTasksPromise={paginatedTasksPromise}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};