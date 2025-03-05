import { useState, startTransition, useOptimistic, use } from "react";
import { fetchUsers, TUser } from "../../../shared/usersApi";
import { createUserAction, deleteUserAction } from "../model/actions";

const defaultUsersPromise = fetchUsers();

export const useUsers = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => {
    startTransition(() => setUsersPromise(fetchUsers()));
  }
  const [createdUsers, createOptimisticUser] = useOptimistic(
    [] as TUser[],
    (prevState, user: TUser) => [...prevState, user]
  );

  const [deletedUsersIds, deleteOptimisticUser] = useOptimistic(
    [] as string[],
    (prevState, id: string) => prevState.concat(id)
  );

  const useUsersList = () => {
    const users = use(usersPromise);
    
    return users.concat(createdUsers).filter(user => !deletedUsersIds.includes(user.id))
  }

  return {
    deleteUserAction: deleteUserAction({ refetchUsers, deleteOptimisticUser }),
    createUserAction: createUserAction({ refetchUsers, createOptimisticUser }),
    useUsersList
  }
} 