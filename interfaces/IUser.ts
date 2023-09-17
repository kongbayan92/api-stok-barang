export interface IUserCreate {
  kode: string;
  status: number;
  username: string;
  password: string;
  email: string;
}

export interface IUser {
  kode?: string;
  status: number;
  username: string;
  password?: string;
  email: string;
}

export interface IUserSignin {
  email: string;
  password: string;
}