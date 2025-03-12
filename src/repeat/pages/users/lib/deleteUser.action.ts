import { TRepeatAction } from "../../../shared/types/action";
import { repeatDeleteUser } from "../api/api";

type TRepeatDeleteUserState = {
  error?: string;
};

type TRepeatDeleteUserActionWrapperParams = {
  refetchUsers: () => void;
  setDeleteOptimisticId: (id: string) => void;
};

export type TRepeatDeleteUserAction = TRepeatAction<TRepeatDeleteUserState>;

export const repeatDeleteUserActionWrapper = (
  { refetchUsers, setDeleteOptimisticId }: TRepeatDeleteUserActionWrapperParams
): TRepeatDeleteUserAction => {
  return async (_, formdata) => {
    const userId = formdata.get('userId') as string;
    try {
      setDeleteOptimisticId(userId);
      await repeatDeleteUser(userId);
      refetchUsers();

      return {}
    } catch {
      return {
        error: 'Something went wrong while deletion user!'
      }
    }
  };
};