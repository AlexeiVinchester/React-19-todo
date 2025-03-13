import { useOptimistic, use } from "react";
import { repeatDeleteUserActionWrapper } from "./deleteUser.action";
import { repeatCreateUserActionWrapper } from "./createUser.action";
import { TRepeatUser } from "../model/user.type";
import { useRepeatUsersGlobal } from "../../../entities/UsersContext/useRepeatUsersGlobal";


export const useRepeatUsers = () => {
  const { usersPromise, refetchUsers } = useRepeatUsersGlobal()

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