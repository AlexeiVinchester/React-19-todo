import { TRepeatUser } from "../model/user.type"
import { RepeatUserCard } from "./UserCard";
import { TRepeatDeleteUserAction } from "../lib/deleteUser.action";

type TRepeatUsersListProps = {
  useRepeatUsersList: () => TRepeatUser[];
  deleteUserAction: TRepeatDeleteUserAction
};

export const RepeatUsersList = ({ useRepeatUsersList, deleteUserAction }: TRepeatUsersListProps) => {
  const users = useRepeatUsersList();

  return (
    <div className="flex flex-col">
      {
        users.map((user) => (
          <RepeatUserCard key={user.id} user={user} deleteUserAction={deleteUserAction} />
        ))
      }
    </div>
  )
}