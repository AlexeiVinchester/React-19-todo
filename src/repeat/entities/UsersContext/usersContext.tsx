import { ReactNode, startTransition, useState } from "react";
import { repeatFetchUsers } from "../../pages/users/api/api";
import { RepeatUsersContext } from "./repeatUsersContext";

type TRepeatUsersContextProviderProps = {
  children: ReactNode;
};

const repeatDefaultPromise = repeatFetchUsers();

export const RepeatUsersContextProvider = ({ children }: TRepeatUsersContextProviderProps) => {
  const [usersPromise, setUsersPromise] = useState(repeatDefaultPromise);
  const refetchUsers = () =>
    startTransition(
      () => setUsersPromise(repeatFetchUsers())
    );

  return (
    <RepeatUsersContext value={{ usersPromise, refetchUsers }}>
      {children}
    </RepeatUsersContext>
  );
};