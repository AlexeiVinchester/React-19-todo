import { Suspense, useState } from "react";
import { fetchUsers } from "../../../shared/api";
import { CreateUserForm } from "./CreateUserForm";
import { UsersList } from "./UsersList";

const defaultUsersPromise = fetchUsers();

export const UsersPage = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => setUsersPromise(fetchUsers());

  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>
      <CreateUserForm refetchUsers={refetchUsers} />
      <Suspense fallback={<p>Loading...</p>}>
        <UsersList usersPromise={usersPromise} />
      </Suspense>
    </main>
  );
}

