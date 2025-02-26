import { CreateUserForm } from "./CreateUserForm";
import { UsersList } from "./UsersList";

export const UsersPage = () => {
  return (
    <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>
      <CreateUserForm />
      <UsersList users={[
        { id: '1', email: 'alexei@mail.ru' },
        { id: '2', email: 'alexei.vin@mail.ru' },
      ]} />
    </main>
  );
}

