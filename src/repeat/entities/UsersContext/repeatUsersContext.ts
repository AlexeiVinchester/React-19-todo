import { createContext } from "react";
import { TRepeatUser } from "../../pages/users/model/user.type";

type TRepeatUsersContext = {
  usersPromise: Promise<TRepeatUser[]>;
  refetchUsers: () => void;
};

export const RepeatUsersContext = createContext<TRepeatUsersContext | null>(null);
