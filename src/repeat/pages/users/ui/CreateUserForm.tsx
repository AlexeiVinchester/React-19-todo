import { useActionState, useOptimistic, useRef } from "react";
import { TRepeatCreateUserAction } from "../lib/createUser.action"

type TRepeatCreateUserFormProps = {
  createUserAction: TRepeatCreateUserAction;
};

export const RepeatCreateUserForm = ({ createUserAction }: TRepeatCreateUserFormProps) => {
  const [state, dispatch, isPending] = useActionState(
    createUserAction,
    { email: '' }
  );

  const [optimisticState, setOptimisticState] = useOptimistic(state);

  const formRef = useRef<HTMLFormElement | null>(null)

  const formAction = (formData: FormData) => {
    setOptimisticState({ email: '' });
    dispatch(formData);
    formRef.current?.reset();
  };

  return (
    <form className="flex gap-2" action={formAction} ref={formRef}>
      <input
        type="email"
        name="email"
        disabled={isPending}
        className="border p-2 m-2 rounded disabled:bg-gray-400"
        defaultValue={optimisticState.email}
      />
      <button
        type="submit"
        className="disabled:bg-gray-400 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isPending}
      >
        Add
      </button>
      {optimisticState.error && <div className="text-red-500">{optimisticState.error}</div>}
    </form>
  );
};