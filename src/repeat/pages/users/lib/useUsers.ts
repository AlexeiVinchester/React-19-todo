import { useState, startTransition, useOptimistic, use } from "react";
import { repeatFetchUsers } from "../api/api";
import { repeatDeleteUserActionWrapper } from "./deleteUser.action";
import { repeatCreateUserActionWrapper } from "./createUser.action";
import { TRepeatUser } from "../model/user.type";

const defaultUsersPromise = repeatFetchUsers();

export const useRepeatUsers = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => {
    startTransition(() => setUsersPromise(repeatFetchUsers()));
  }

  const [createdOptimisticUsers, setCreatedOptimisticUsers] = useOptimistic(
    [] as TRepeatUser[],
    (prevState, user: TRepeatUser) => [...prevState, user]
  );

  const [deletedIds, setDeleteOptimisticId] = useOptimistic(
    [] as string[],
    (prevState, id: string) => prevState.concat(id)
  );

  const useRepeatUsersList = () => {
    const users = use(usersPromise);
    return users.concat(createdOptimisticUsers).filter(user => !deletedIds.includes(user.id));
  };
  
  return {
    usersPromise,
    deleteUserAction: repeatDeleteUserActionWrapper({ refetchUsers, setDeleteOptimisticId }),
    createUserAction: repeatCreateUserActionWrapper({ refetchUsers, setCreatedOptimisticUsers }),
    useRepeatUsersList
  };
};