import { useOptimistic, use } from "react";
import { TUser } from "../../../shared/api/usersApi";
import { createUserAction, deleteUserAction } from "./actions";
import { useUsersGlobal } from "../../../entities/usersContext/useUsersGlobal";

export const useUsers = () => {
  const { usersPromise, refetchUsers } = useUsersGlobal();

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