import { startTransition, Suspense, useState } from "react";
import { fetchUsers } from "../../../shared/api";
import { CreateUserForm } from "./CreateUserForm";
import { UsersList } from "./UsersList";
import { ErrorBoundary } from "react-error-boundary";

const defaultUsersPromise = fetchUsers();

export const UsersPage = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>
      <CreateUserForm refetchUsers={refetchUsers} />
      <ErrorBoundary fallbackRender={(e) => <div className="text-red-500">Something goes wrong! {JSON.stringify(e)}</div>}>
        <Suspense fallback={<p>Loading...</p>}>
          <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

