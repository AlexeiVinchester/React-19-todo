import { use } from "react";
import { useRepeatUsersGlobal } from "../../../entities/UsersContext/useRepeatUsersGlobal"

type TRepeatUserPreviewProps = {
  userId: string;
}

export const RepeatUserPreview = ({ userId }: TRepeatUserPreviewProps) => {
  const { usersPromise } = useRepeatUsersGlobal();
  const users = use(usersPromise);

  return (
    <span className="text-green-700">{users.find(user => user.id === userId)?.email}</span>
  );
};