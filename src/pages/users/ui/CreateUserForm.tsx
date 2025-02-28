import { startTransition, useActionState, useState } from "react";
import { createUserAction } from "../api/actions";

type TCreateUserFormProps = {
  refetchUsers: () => void;
}

export const CreateUserForm = ({ refetchUsers }: TCreateUserFormProps) => {
  const [email, setEmail] = useState('');

  const [state, dispatch, isPending] = useActionState(
    createUserAction({ refetchUsers, setEmail }),
    {}
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      dispatch({ email })
    });
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        className="border p-2 m-2 rounded disabled:bg-gray-400"
        disabled={isPending}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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



