import { createUser } from "../../../shared/api";

type TCreateUserActionState = {
  error?: string;
};

type TCreateUserAction = {
  refetchUsers: () => void;
};

export const createUserAction = ({ refetchUsers }: TCreateUserAction) => {
  return async (
    prevState: TCreateUserActionState,
    formdata: FormData
  ) => {
    const email = formdata.get('email') as string;

    if(email === 'admin@gmail.com') {
      return {error: 'Admin email is not allowed!'}
    }

    try {
      await createUser({
        email,
        id: crypto.randomUUID()
      });

      refetchUsers();

      return {};
    } catch {
      return { error: 'Error while creating new user!' }
    }
  }
}

