import { useActionState } from "react";
import { TRepeatDeleteUserAction } from "../lib/deleteUser.action";
import { TRepeatUser } from "../model/user.type"

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
        <button
          className="border rounded py-2 px-4 bg-blue-600 hover:bg-red-500 disabled:bg-gray-500"
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