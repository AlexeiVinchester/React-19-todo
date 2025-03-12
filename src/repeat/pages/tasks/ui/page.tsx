import { Suspense } from "react";
import { useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { RepeatTasksList } from "./TasksList";
import { RepeatCreateTaskForm } from "./CreateNewTask";
import { useRepeatTasks } from "../lib/useTasks";

export const RepeatTasksPage = () => {
  const { userId = "" } = useParams();
  const {
    useRepeatTasksList,
    createTaskAction,
    deleteTaskAction
  } = useRepeatTasks(userId);

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">{userId}</h1>
      <RepeatCreateTaskForm createTaskAction={createTaskAction} />
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">{JSON.stringify(e)}</div>}>
        <Suspense fallback={<div className="text-blue-300">Loading...</div>}>
          <RepeatTasksList useRepeatTasksList={useRepeatTasksList} deleteAction={deleteTaskAction} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}