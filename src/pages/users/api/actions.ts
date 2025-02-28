import { createUser, deleteUser } from "../../../shared/api";

type TCreateUserActionState = {
  error?: string;
  email: string;
};

type TCreateUserAction = {
  refetchUsers: () => void;
};

export const createUserAction = ({ refetchUsers }: TCreateUserAction) => {
  return async (
    _: TCreateUserActionState,
    formdata: FormData
  ): Promise<TCreateUserActionState> => {
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

type TDeleteUserActionState = {
  error?: string;
};

type TDeleteUserAction = {
  refetchUsers: () => void;
  userId: string;
};

export const deleteUserAction = ({ refetchUsers, userId }: TDeleteUserAction) => {
  return async (): Promise<TDeleteUserActionState> => {
    try {
      await deleteUser(userId);

      refetchUsers();

      return {};
    } catch {
      return { error: 'Error while deleting of user!' }
    }
  };
};




