import { Suspense, useRef, useState } from "react";
import { useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { RepeatTasksList } from "./TasksList";
import { RepeatCreateTaskForm } from "./CreateNewTask";
import { useRepeatTasks } from "../lib/useTasks";
import { RepeatPaginationContainer } from "../../../shared/ui/RepeatPaginationContainer";
import { TSort } from "../../../shared/types/sort";

export const RepeatTasksPage = () => {
  const { userId = "" } = useParams();
  const [search, setSearch] = useState('');
  const [createdAtSort, setCreatedAtSort] = useState<TSort>('asc');

  const {
    useRepeatTasksList,
    createTaskAction,
    deleteTaskAction,
    handleChangePage,
    paginatedTasksPromise,
    refetchTasks
  } = useRepeatTasks(userId, search, createdAtSort);

  const debounceRef = useRef<number>(0);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearch(search);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      refetchTasks({ title: search })
    }, 300)
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const createdAt = e.target.value as TSort;
    setCreatedAtSort(createdAt);
    refetchTasks({ createdAt })
  };

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">{userId}</h1>
      <RepeatCreateTaskForm createTaskAction={createTaskAction} />
      <div>
        <input
          className="border p-2 m-2 rounded"
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleChangeSearch}
        />
        <select
          className="border rounded"
          onChange={handleChangeSort}
          value={createdAtSort}
        >
          <option value='asc'>Asc</option>
          <option value='desc'>Desc</option>
        </select>
      </div>

      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">{JSON.stringify(e)}</div>}>
        <Suspense fallback={<div className="text-blue-300">Loading...</div>}>
          <RepeatTasksList
            userId={userId}
            useRepeatTasksList={useRepeatTasksList}
            deleteAction={deleteTaskAction}
          />
          <RepeatPaginationContainer
            handleChangePage={handleChangePage}
            paginatedTasksPromise={paginatedTasksPromise}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}