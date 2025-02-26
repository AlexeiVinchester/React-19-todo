import { use } from "react";
import { TUser } from "../../../shared/api";
import { UserCard } from "./UserCard";

type TUsersListProps = {
  usersPromise: Promise<TUser[]>;
}

export const UsersList = ({ usersPromise }: TUsersListProps) => {

  const users = use(usersPromise);

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

