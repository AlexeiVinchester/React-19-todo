export type TRepeatAction<T> = (
  prevState: T,
  formData: FormData
) => Promise<T>;