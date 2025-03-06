import { startTransition, Suspense, useMemo, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CreateTaskForm } from "./CreateTaskForm"
import { TasksList, } from "./TasksList"
import { useParams } from "react-router"
import { fetchTasks } from "../../../shared/tasksApi"

export const TodolistPage = () => {
  const { userId = '' } = useParams();

  const [paginatedTasksPromise, setPaginatedTasksPromise] = useState(
    () => fetchTasks({ filters: { userId } })
  );

  const refetchTasks = () => {
    startTransition(() => setPaginatedTasksPromise(fetchTasks({ filters: { userId } })))
  };

  const tasksPromise = useMemo(
    () => paginatedTasksPromise.then((res) => res.data),
    [paginatedTasksPromise]
  );

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">{userId}</h1>
      <CreateTaskForm refetchTasks={refetchTasks} userId={userId} />
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">Something goes wrong! {JSON.stringify(e)}</div>}>
        <Suspense fallback={<p>Loading...</p>}>
          <TasksList tasksPromise={tasksPromise} refetchTasks={refetchTasks} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}