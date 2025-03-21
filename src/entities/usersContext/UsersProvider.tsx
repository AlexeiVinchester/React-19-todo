import { ReactNode, startTransition, useState } from "react";
import { fetchUsers } from "../../shared/api/usersApi";
import { UsersContext } from "./usersContext";

type TUsersProviderProps = {
  children: ReactNode;
};

const defaultPromise = fetchUsers();

export const UsersProvider = ({ children }: TUsersProviderProps) => {
  const [usersPromise, setUsersPromise] = useState(defaultPromise);
  const refetchUsers = () =>
    startTransition(() => setUsersPromise(fetchUsers()));

  return (
    <UsersContext value={{ refetchUsers, usersPromise }}>
      {children}
    </UsersContext>
  );
};

