import { useActionState } from "react";
import { TCreateUserAction } from "../api/actions";

type TCreateUserFormProps = {
  createUserAction: TCreateUserAction
}

export const CreateUserForm = ({ createUserAction }: TCreateUserFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    createUserAction,
    { email: '' }
  );

  return (
    <form className="flex gap-2" action={dispatch}>
      <input
        type="email"
        name="email"
        className="border p-2 m-2 rounded disabled:bg-gray-400"
        disabled={isPending}
        defaultValue={state.email}
      />
      <button
        type="submit"
        disabled={isPending}
        className="disabled:bg-gray-400 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  );
}



