import { createUser } from "../../../shared/api";

type TCreateUserActionState = {
  error?: string;
};

type TCreateUserAction = {
  refetchUsers: () => void;
  setEmail: (email: string) => void;
};

export const createUserAction = ({ refetchUsers, setEmail }: TCreateUserAction) => {
  return async (
    prevState: TCreateUserActionState,
    formdata: { email: string }
  ) => {
    try {
      await createUser({
        email: formdata.email,
        id: crypto.randomUUID()
      });

      refetchUsers();
      setEmail(formdata.email)

      return {}
    } catch {
      return { error: 'Error while creating new user!' }
    }
  }
}

