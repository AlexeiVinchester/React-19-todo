import { useState, startTransition } from "react";
import { fetchUsers } from "../../../shared/api";

const defaultUsersPromise = fetchUsers();

export const useUsers = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

  return { usersPromise, refetchUsers }
} 