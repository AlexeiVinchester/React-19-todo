import { createUser } from "../../../shared/api";

type TCreateUserActionState = {
  error?: string;
  email: string;
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

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin email is not allowed!',
        email
      };
    }

    try {
      await createUser({
        email,
        id: crypto.randomUUID()
      });

      refetchUsers();

      return { email: '' };
    } catch {
      return {
        error: 'Error while creating new user!',
        email
      }
    }
  }
}

