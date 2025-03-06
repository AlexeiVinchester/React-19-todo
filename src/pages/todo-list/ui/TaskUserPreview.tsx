import { use } from "react";
import { useUsersGlobal } from "../../../entities/usersContext/useUsersGlobal";

type TTaskUserPreviewProps = {
  userId: string;
};

export const TaskUserPreview = ({ userId }: TTaskUserPreviewProps) => {
  const { usersPromise } = useUsersGlobal();
  const users = use(usersPromise);

  return <span>{users.find((user) => user.id === userId)?.email}</span>;
};