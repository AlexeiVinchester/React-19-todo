import { RepeatUsersList } from "./UsersList";
import { useRepeatUsers } from "../lib/useUsers";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { RepeatCreateUserForm } from "./CreateUserForm";


export const RepeatUsersPage = () => {
  const {
    deleteUserAction,
    createUserAction,
    useRepeatUsersList
  } = useRepeatUsers();

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>
      <RepeatCreateUserForm createUserAction={createUserAction} />
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">{JSON.stringify(e)}</div>}>
        <Suspense fallback={<div className="text-blue-300">Loading...</div>}>
          <RepeatUsersList useRepeatUsersList={useRepeatUsersList} deleteUserAction={deleteUserAction} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}