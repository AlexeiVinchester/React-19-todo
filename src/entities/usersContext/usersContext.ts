import { createContext } from "react";
import { TUser } from "../../shared/usersApi";

type TUsersContext = {
  usersPromise: Promise<TUser[]>;
  refetchUsers: () => void;
};

export const UsersContext = createContext<TUsersContext | null>(null);
