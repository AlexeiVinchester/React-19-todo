import { use } from "react";
import { TUser } from "../../../shared/api";
import { UserCard } from "./UserCard";

type TUsersListProps = {
  usersPromise: Promise<TUser[]>;
  refetchUsers: () => void;
}

export const UsersList = ({ usersPromise, refetchUsers }: TUsersListProps) => {

  const users = use(usersPromise);

  return (
    <div className="flex flex-col">
      {
        users.map((user) => (
          <UserCard key={user.id} user={user} refetchUsers={refetchUsers}/>
        ))
      }
    </div>
  );
}

