import { use } from "react";
import { UsersContext } from "../model/usersContext";

export const useUsersGlobal = () => {
  const context = use(UsersContext);
  if (!context) {
    throw new Error('Wrong users context!')
  }

  return context;
};