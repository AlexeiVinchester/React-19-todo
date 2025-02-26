import { useState } from "react";
import { createUser } from "../../../shared/api";

type TCreateUserFormProps = {
  refetchUsers: () => void;
}

export const CreateUserForm = ({ refetchUsers }: TCreateUserFormProps) => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({ email, id: crypto.randomUUID() });
    refetchUsers();
    setEmail(email);
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        className="border p-2 m-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create user
      </button>
    </form>
  );
}



