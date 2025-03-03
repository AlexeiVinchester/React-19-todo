import { use } from "react";
import { TUser } from "../../../shared/api";
import { UserCard } from "./UserCard";
import { TDeleteUserAction } from "../api/actions";

type TUsersListProps = {
  usersPromise: Promise<TUser[]>;
  deleteUserAction: TDeleteUserAction
}

export const UsersList = ({ usersPromise, deleteUserAction }: TUsersListProps) => {

  const users = use(usersPromise);

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

