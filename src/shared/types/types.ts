export type TAction<T> = (
  prevState: T,
  formData: FormData
) => Promise<T>; 

