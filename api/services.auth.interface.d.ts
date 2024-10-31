export interface AuthLoginUserServiceDataProps {
  email: string;
  password: string;
}
export interface AuthLoginUserServiceSuccessProps {
  id: string;
  username: string;
  lastname: string;
  authToken: string;
  email: string;
  type_user: 'normal' | 'deliveryman' | 'admin';
}

export interface AuthSignupUserServiceDataProps {
  email: string;
  username: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
}
export interface AuthSignupUserServiceSuccessProps {
  id: string;
  username: string;
  lastname: string;
  authToken: string;
  email: string;
  type_user: 'normal' | 'deliveryman' | 'admin';
}

export interface AuthValidateTokenUserServiceSuccessProps {
  id: string;
  username: string;
  lastname: string;
  authToken: string;
  email: string;
  type_user: 'normal' | 'deliveryman' | 'admin';

}

export interface AuthVerifyEmailServiceSuccessProps {}
