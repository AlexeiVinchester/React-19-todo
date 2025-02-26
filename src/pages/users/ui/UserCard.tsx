import { TUser } from "../../../shared/api";

type TUserCardProps = {
  user: TUser;
}

export const UserCard = ({ user }: TUserCardProps) => {
  return (
    <div
      className="border p-2 m-2 rounded bg-gray-100 flex gap-2 items-center"
    >
      {user.email}
      <button
        className="m-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
      >
        Delete
      </button>
    </div>
  );
}