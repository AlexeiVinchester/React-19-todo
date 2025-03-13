import { use } from "react";
import { RepeatUsersContext } from "./repeatUsersContext";

export const useRepeatUsersGlobal = () => {
  const usersContext = use(RepeatUsersContext);
  if (!usersContext) {
    throw new Error('Error with users context!');
  }

  return usersContext;
};