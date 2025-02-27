import { useState, useTransition } from "react";
import { createUser } from "../../../shared/api";

type TCreateUserFormProps = {
  refetchUsers: () => void;
}

export const CreateUserForm = ({ refetchUsers }: TCreateUserFormProps) => {
  const [email, setEmail] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await createUser({ email, id: crypto.randomUUID() });
      refetchUsers();
      setEmail("");
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
    </form>
  );
}



