import { TAction } from "../../../shared/types/types";
import { createUser, deleteUser, TUser } from "../../../shared/api/usersApi";

type TCreateUserActionState = {
  error?: string;
  email: string;
};

type TCreateUserActionWrapperParams = {
  refetchUsers: () => void;
  createOptimisticUser: (user: TUser) => void;
};

export type TCreateUserAction = TAction<TCreateUserActionState>;

export const createUserAction = ({ refetchUsers, createOptimisticUser }: TCreateUserActionWrapperParams): TCreateUserAction => {
  return async (_, formdata) => {
    const email = formdata.get('email') as string;

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin email is not allowed!',
        email
      };
    }

    try {
      const user = { email, id: crypto.randomUUID() };
      createOptimisticUser(user);
      await createUser(user);

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

type TDeleteUserActionParams = {
  refetchUsers: () => void;
  deleteOptimisticUser: (userId: string) => void;
};

export type TDeleteUserAction = TAction<TDeleteUserActionState>;

export const deleteUserAction = ({ refetchUsers, deleteOptimisticUser }: TDeleteUserActionParams): TDeleteUserAction => {
  return async (_, formdata) => {
    try {
      const userId = formdata.get('userId') as string;
      deleteOptimisticUser(userId);
      await deleteUser(userId);

      refetchUsers();

      return {};
    } catch {
      return { error: 'Error while deleting of user!' }
    }
  };
};




