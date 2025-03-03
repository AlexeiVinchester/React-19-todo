import { useState, startTransition } from "react";
import { fetchUsers } from "../../../shared/api";
import { createUserAction, deleteUserAction } from "../api/actions";

const defaultUsersPromise = fetchUsers();

export const useUsers = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

  return {
    usersPromise,
    deleteUserAction: deleteUserAction({ refetchUsers }),
    createUserAction: createUserAction({ refetchUsers })
  }
} 