import { TRepeatAction } from "../../../shared/types/action";
import { repeatCreateUser } from "../api/api";
import { TRepeatUser } from "../model/user.type";

type TRepeatCreateUserState = {
  email: string;
  error?: string;
};

type TRepeatCreateUserActionWrapperProps = {
  refetchUsers: () => void;
  setCreatedOptimisticUsers: (user: TRepeatUser) => void;
}

export type TRepeatCreateUserAction = TRepeatAction<TRepeatCreateUserState>

export const repeatCreateUserActionWrapper = (
  { refetchUsers, setCreatedOptimisticUsers }: TRepeatCreateUserActionWrapperProps
): TRepeatCreateUserAction => {
  return async (_, formdata) => {
    const email = formdata.get('email') as string;

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin email is not allowed!',
        email
      };
    }

    try {
      const user: TRepeatUser = {
        email,
        id: crypto.randomUUID()
      };
      setCreatedOptimisticUsers(user)
      await repeatCreateUser(user);

      refetchUsers();
      return {
        email: ''
      }
    } catch {
      return {
        email,
        error: 'Something went wrong while creating user!'
      }
    }
  };
};