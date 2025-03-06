import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CreateTaskForm } from "./CreateTaskForm"
import { TasksList, } from "./TasksList"
import { useParams } from "react-router"

export const TodolistPage = () => {
  const { userId } = useParams()
  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">{userId}</h1>
      <CreateTaskForm />
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">Something goes wrong! {JSON.stringify(e)}</div>}>
        <Suspense fallback={<p>Loading...</p>}>
          <TasksList />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}