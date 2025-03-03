import { useActionState } from "react";
import { createUserAction } from "../api/actions";

type TCreateUserFormProps = {
  refetchUsers: () => void;
}

export const CreateUserForm = ({ refetchUsers }: TCreateUserFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    createUserAction({ refetchUsers }),
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



