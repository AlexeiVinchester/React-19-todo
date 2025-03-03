import { Suspense } from "react";
import { CreateUserForm } from "./CreateUserForm";
import { UsersList } from "./UsersList";
import { ErrorBoundary } from "react-error-boundary";
import { useUsers } from "../lib/useUsers";

export const UsersPage = () => {
  const { usersPromise, deleteUserAction, createUserAction } = useUsers()

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>
      <CreateUserForm createUserAction={createUserAction} />
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">Something goes wrong! {JSON.stringify(e)}</div>}>
        <Suspense fallback={<p>Loading...</p>}>
          <UsersList usersPromise={usersPromise} deleteUserAction={deleteUserAction} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

