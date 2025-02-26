import { TUser } from "../../../shared/api";
import { UserCard } from "./UserCard";

type TUsersListProps = {
  users: TUser[];
}

export const UsersList = ({ users }: TUsersListProps) => {
  return (
    <div className="flex flex-col">
      {
        users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))
      }
    </div>
  );
}