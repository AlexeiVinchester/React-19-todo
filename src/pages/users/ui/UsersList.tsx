import { TUser } from "../../../shared/usersApi";
import { UserCard } from "./UserCard";
import { TDeleteUserAction } from "../lib/actions";

type TUsersListProps = {
  deleteUserAction: TDeleteUserAction,
  useUsersList: () => TUser[]
}

export const UsersList = ({ useUsersList, deleteUserAction }: TUsersListProps) => {
  const users = useUsersList();

  return (
    <div className="flex flex-col">
      {
        users.map((user) => (
          <UserCard key={user.id} user={user} deleteUserAction={deleteUserAction} />
        ))
      }
    </div>
  );
}

