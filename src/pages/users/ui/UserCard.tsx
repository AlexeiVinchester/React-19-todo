import { useActionState } from "react";
import { TUser } from "../../../shared/usersApi";
import { TDeleteUserAction } from "../model/actions";

type TUserCardProps = {
  user: TUser;
  deleteUserAction: TDeleteUserAction
}

export const UserCard = ({ user, deleteUserAction }: TUserCardProps) => {

  const [state, dispatch, isPending] = useActionState(
    deleteUserAction,
    {}
  );

  return (
    <div
      className="border p-2 m-2 rounded bg-gray-100 flex gap-2 items-center"
    >
      {user.email}
      <form className="ml-auto">
        <input type="text" name="userId" hidden value={user.id} readOnly/>
        <button
          className="m-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          disabled={isPending}
          formAction={dispatch}
        >
          Delete
        </button>
      </form>

      {state.error && <div className="text-red-500">{state.error}</div>}
    </div>
  );
}

