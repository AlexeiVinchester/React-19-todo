import { useActionState } from "react";
import { TRepeatDeleteUserAction } from "../lib/deleteUser.action";
import { TRepeatUser } from "../model/user.type"
import { Link } from "react-router";

type TRepeatUserCardProps = {
  user: TRepeatUser;
  deleteUserAction: TRepeatDeleteUserAction
};

export const RepeatUserCard = ({ user, deleteUserAction }: TRepeatUserCardProps) => {
  const [state, dispatch, isPending] = useActionState(
    deleteUserAction,
    {}
  );

  return (
    <div
      className="border p-2 m-2 rounded bg-gray-100 flex gap-2 items-center"
    >
      {user.email}
      <form className="ml-auto" action={dispatch}>
        <input hidden readOnly name="userId" value={user.id} />
        <Link
          to={`${user.id}/tasks`}
          className="bg-blue-500 text-white hover:bg-blue-700 font bold py-3 px-4 rounded ml-auto disabled:bg-grey-400"
        >
          Tasks
        </Link>
        <button
          className="mx-2 border rounded py-2 px-4 bg-blue-600 hover:bg-red-500 disabled:bg-gray-500"
          disabled={isPending}
          type="submit"
        >
          Delete
        </button>
        {state.error && <div className="text-red-500">{state.error}</div>}
      </form>
    </div>
  );
};