export interface IUser {
  username: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  avatar?: string | null | undefined;
  confirmPassword: string | null | undefined;
}
